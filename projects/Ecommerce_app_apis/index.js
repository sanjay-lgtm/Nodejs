import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import authRoute from './routes/authRoutes.js';
import bodyParser from "body-parser";
import loggingMiddleware from "./middleware/loggingMiddleware.js";
import { errorHandler, notFound } from "./middleware/ErrorHandler.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080

connectDB();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(loggingMiddleware);
// app.use('/',(req,res)=>{
//     res.send('Hello World')
// })

app.use('/api/user',authRoute)
app.use(notFound);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})