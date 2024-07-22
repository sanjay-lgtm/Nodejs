import express from 'express';
import dotenv from 'dotenv';
import fileRoutes from './routes/file.js'
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: 'http://127.0.0.1:5500' // Your frontend URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/files",fileRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})