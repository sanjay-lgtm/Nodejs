import express from 'express';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "localhost",
    port: 587,
    secure: false
})
const app = express();

app.get('/', (req, res) => {
    const mailOptions = {
        to: "sanjaysharma28111997@gmail.com",
        from: "sanjayv971128@gmail.com",
        subject: "Test Email",
        text: "Hello mail send successfully",
        // html:`
        // <html>
        // <head>
        // <body>
        // <h3>Welcome to mailapp</h3>
        // <p style="color:blue;">mail send successfully</p>
        // </body>
        // </head>
        // </html>
        // `
    }


    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "Failed to send email" });
        } else {
            console.log('Email sent: ' + info);
            res.json({ success: true, message: "Mail sent Successfully!" });
        }
    });
})



app.listen(8080, () => {
    console.log(`Server is running on 8080`);
})