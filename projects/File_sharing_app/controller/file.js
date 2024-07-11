import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import fileModel from '../model/file.js';
//Where to store/ save the file?

const uploadFolderPath = 'uploads';

if(!fs.existsSync(uploadFolderPath)){
    fs.mkdirSync(uploadFolderPath);
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolderPath),
    filename: (req, file, cb) => {
        const filename = uuidv4() + path.extname(file.originalName);
        cb(null, filename);
    }
})

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
                message:error.message,
            });
        }
        console.log(req.file);
        const fileData = {
            originalName: req.file.originalName,
            newName: req.file.filename,
            size: req.file.size,
        }
        await fileModel.create(fileData);
        console.log(req.body);
        res.json({
            success: true,
            message: "File Uploaded Successfully"
        })
    });

}


