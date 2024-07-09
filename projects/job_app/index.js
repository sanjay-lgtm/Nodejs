import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import jobRoutes from './routes/job.js'
import loggingMiddleware from './middlewares/loggingMiddleware.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.use(loggingMiddleware);
app.use('/api/jobs', jobRoutes)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
