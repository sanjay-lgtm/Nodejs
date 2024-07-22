import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import fileModel from '../model/file.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

const uploadFolderPath = 'uploads';

if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolderPath),
    filename: (req, file, cb) => {
        const filename = uuidv4() + path.extname(file.originalname);
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6 // 6 MB
    }
}).single("attachment");

export const uploadFile = (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const downloadLink = `${req.protocol}://${req.get('host')}/api/files/download/${req.file.filename}`;
        const fileData = {
            originalName: req.file.originalname,
            newName: req.file.filename,
            size: req.file.size,
            downloadLink: downloadLink
        }
        const newlyInsertedFile = await fileModel.create(fileData);
        res.json({
            success: true,
            message: "File Uploaded Successfully",
            fileId: newlyInsertedFile._id,
            downloadLink: downloadLink
        });
    });
}

export const generateSharableLink = async (req, res) => {
    const sharableLink = `/api/files/download/${req.params.fileId}`;
    const fileData = await fileModel.findById(req.params.fileId);
    if (!fileData) {
        return res.status(404).json({
            success: false,
            message: "File Not Found",
        });
    }
    res.json({
        success: true,
        message: "Generated the sharable link",
        sharableLink: sharableLink
    })
}

export const downloadFile = async (req, res) => {
    const fileId = req.params.fileId;
    const fileData = await fileModel.findById(fileId);
    if (!fileData) {
        return res.status(404).end("Invalid URL");
    }
    const filePath = `uploads/${fileData.newName}`;
    res.download(filePath, fileData.originalName);
}

export const sendMail = async (req, res) => {
    const fileId = req.body.fileId;
    const sharableLink = `${process.env.BASE_URL}/api/files/download/${fileId}`;
    const emailData = {
        to: req.body.email,
        from: "do-not-reply@filesharing.com",
        subject: "File Sharing",
        html: `
        <p>
            Your friend has shared a file with you via file-sharing app, please click the link to download the file <a target="_blank" href="${sharableLink}">Click Here</a>
        </p>
        `,
    };
    transporter.sendMail(emailData, (error, info) => {
        if (error) {
            return res.json({
                success: false,
                message: "Unable to send email",
                error: error,
            })
        }
        res.json({
            success: true,
            message: "Mail sent successfully",
        })
    })
}