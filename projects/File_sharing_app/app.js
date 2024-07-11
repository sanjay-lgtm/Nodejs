import express from 'express';
import dotenv from 'dotenv';
import fileRoutes from './routes/file.js'
import connectDB from './config/db.js';
dotenv.config();
const app = express();
connectDB();
app.use(express.json());

app.use("/api/file",fileRoutes);

app.listen(8080,()=>{
    console.log('server is running on port 8080');
})