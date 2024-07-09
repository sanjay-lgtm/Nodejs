import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import { nanoid } from "nanoid";
import loggingMiddleware from './middlewares/loggingMiddleware.js';

const isUrlValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

const app = express();

app.use(express.json());
app.use(loggingMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "urlform.html"));
});

app.post("/shorten", (req, res) => {
  const isValidUrl = isUrlValid(req.body.longUrl);
  if (!isValidUrl) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid longUrl",
    });
  }
  const shortUrl = nanoid(5);
  
  const urlsPath = path.join(__dirname, 'urls.json');
  
  let urlsJson = {};
  if (fs.existsSync(urlsPath)) {
    const urlsFromFile = fs.readFileSync(urlsPath, { encoding: "utf-8" });
    urlsJson = JSON.parse(urlsFromFile);
  }

  urlsJson[shortUrl] = req.body.longUrl; // Adding new url k-v pair in the json

  fs.writeFileSync(urlsPath, JSON.stringify(urlsJson));
  res.json({
    success: true,
    data: `http://localhost:8080/${shortUrl}`,
  });
});

app.get("/:shortUrl", (req, res) => {
  const { shortUrl } = req.params;
  
  const urlsPath = path.join(__dirname, 'urls.json');
  if (!fs.existsSync(urlsPath)) {
    return res.end("Invalid Short Url");
  }
  
  const urls = fs.readFileSync(urlsPath, { encoding: "utf-8" });
  const urlsJson = JSON.parse(urls);
  const longUrl = urlsJson[shortUrl];
  if (!longUrl) {
    return res.end("Invalid Short Url");
  }
  res.redirect(longUrl);
});

app.listen(8080, () => console.log(`Server is up and running at port 8080`));
