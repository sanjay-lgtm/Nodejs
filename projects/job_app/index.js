import express from 'express';
import mongoose from 'mongoose';
const app = express();

mongoose.connect("mongodb://localhost:27017/job_app")
.then(() => console.log("connected to db"))
.catch((err) => console.log("Error while connection",err))

app.use(express.json())

app.listen(8080,()=> console.log(`Server is running on 8080`))
