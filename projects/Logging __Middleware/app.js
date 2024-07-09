import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import loggingMiddleware from './middlewares/loggingMiddleware.js';
import morgan from 'morgan';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connectDB();
app.use(loggingMiddleware);
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: err.message
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})