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
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies
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

  let urlsJson = {};
  try {
    const urlsFromFile = fs.readFileSync('urls.json', { encoding: 'utf-8' });
    urlsJson = JSON.parse(urlsFromFile);
  } catch (err) {
    console.error('Error reading urls.json:', err);
  }

  urlsJson[shortUrl] = req.body.longUrl;

  try {
    fs.writeFileSync('urls.json', JSON.stringify(urlsJson));
  } catch (err) {
    console.error('Error writing to urls.json:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

  res.json({
    success: true,
    data: `http://localhost:8080/${shortUrl}`,
  });
});

app.get("/:shortUrl", (req, res) => {
  const { shortUrl } = req.params;
  let urlsJson = {};
  try {
    const urls = fs.readFileSync('urls.json', { encoding: "utf-8" });
    urlsJson = JSON.parse(urls);
  } catch (err) {
    console.error('Error reading urls.json:', err);
    return res.status(500).end('Internal Server Error');
  }
  
  const longUrl = urlsJson[shortUrl];
  if (!longUrl) {
    return res.status(404).end("Invalid Short Url");
  }
  res.redirect(longUrl);
});

app.listen(8080, () => console.log(`Server is up and running at port 8080`));
