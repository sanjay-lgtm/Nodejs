import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import wishlistRoutes from './routes/wishlist.js';
import loggingMiddleware from "./middleware/loggingMiddleware.js";
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080

connectDB();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(loggingMiddleware)
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})