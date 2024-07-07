import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, '../logs/requests.log');


if(!fs.existsSync(path.join(__dirname,'../logs'))){
    fs.mkdirSync(path.join(__dirname,'../logs'));
}

const loggingMiddleware = (req,res,next) =>{
    const startTime = Date.now();

    res.on('finish',() =>{
        const elapsedTime = Date.now() - startTime;
        const logMessage = `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${res.statusCode} | ${elapsedTime}ms\n`;

        fs.appendFile(logFilePath, logMessage, (err) => {
            if(err){
                console.error('Failed to write to log file:', err);
            }
        });
        console.log(logMessage.trim());
    })
    next()
}

export default loggingMiddleware;