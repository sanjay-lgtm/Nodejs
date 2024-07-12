import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import fileModel from '../model/file.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "localhost",
    port: "1025",
    secure: false,
});

const uploadFolderPath = 'uploads';

if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolderPath),
    filename: (req, file, cb) => {
        const filename = uuidv4() + path.extname(file.originalname); // fixed originalName to originalname
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6 // 6 MB
    }
}).single("attachement");

export const uploadFile = (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        console.log(req.file);
        const fileData = {
            originalName: req.file.originalname, // fixed originalName to originalname
            newName: req.file.filename,
            size: req.file.size,
        }
        const newlyInsertedFile = await fileModel.create(fileData);
        console.log(newlyInsertedFile);
        res.json({
            success: true,
            message: "File Uploaded Successfully",
            fileId: newlyInsertedFile._id,
        });
    });
}


export const generateSharableLink = async (req, res) => {
    const sharableLink = `/files/download/${req.params.fileId}`;
    const fileData = await fileModel.findById(req.params.fileId);
    if (!fileData) {
        return res.status(404).json({
            success: false,
            message: "File Not Found",
        });
    }
    res.json({
        success: true,
        message: "Generate the sharable link",
        sharableLink: sharableLink
    })
}

export const downloadFile = async (req, res) => {
    const fileId = req.params.fileId;
    const fileData = await fileModel.findById(fileId);
    if(!fileData){
        return res.status(404).end("Invalid URL");
    }
    console.log(fileData);
    const path = `uploads/${fileData.newName}`;
    res.download(path, fileData.originalName);
}

export const sendMail = async (req, res) => {
    const fileId = req.body.fileId;
    const sharableLink = `${process.env.BASE_URL}/files/download/${fileId}`;
    //send mail
    const emailData = {
        to: req.body.email,
        from: "do-not-reply@filesharing.com",
        subject: "File Sharing",
        html: `
        <p>
            Your friend has shared a file with you via filesharing app, please click the link to download the file <a target="_blank" href="${sharableLink}">Click Here</a>
        </p>
        `,
    };
    transporter.sendMail(emailData, (error, info) => {
        if (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "Unable to send email",
                error: error,
            })
        }
        console.log(info);
        res.json({
            success: true,
            message: "Mail sent successfully",
        })
    })
}

