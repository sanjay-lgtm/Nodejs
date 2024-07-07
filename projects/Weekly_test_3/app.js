import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT ||3000;

app.use(express.json());

connectDB();
app.use('/api/users',userRoutes)

app.use((err,req,res,next) => {
    console.log(err.stack);
    res.status(500).json({message:err.message});
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
