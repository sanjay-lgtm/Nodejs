import express from 'express';
import  { downloadFile, generateSharableLink, sendMail, uploadFile }  from '../controller/file.js';

const router = express.Router();


// Route for uploading a file
router.post('/upload', uploadFile);

// Route for generating a shareable link
router.get('/files/:fileId', generateSharableLink);

// Route for downloading a file
router.get('/download/:fileId', downloadFile);

// Route for sending an email
router.post('/send-email', sendMail);

export default router;