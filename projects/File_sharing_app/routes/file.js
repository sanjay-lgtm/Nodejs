import express from 'express';
import  { downloadFile, generateSharableLink, sendMail, uploadFile }  from '../controller/file.js';

const router = express.Router();

router.post('/upload',uploadFile); //uplaod a file
router.get('/file/:fileId',generateSharableLink); // Generate a sharable /downloadable link
router.get('/files/download/:fileId',downloadFile) // Download the file
router.post('/send',sendMail);

export default router;