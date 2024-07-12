import express from 'express';
import dotenv from 'dotenv';
import fileRoutes from './routes/file.js'
import connectDB from './config/db.js';
dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/api/file",fileRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})