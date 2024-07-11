import express from 'express';
import  { uploadFile }  from '../controller/file.js';

const router = express.Router();

router.post('/send',uploadFile)

export default router;