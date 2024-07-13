import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.post('/send-mail', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).send('Please fill all the fields');
    }

    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your email',
            pass: 'your password'
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: message,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transport.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.log('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
})

const transport = nodemailer.createTransport({
    // host: "localhost",
    // port: 587,
    // secure: false
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Your Gmail address
        pass: 'your-email-password'   // Your Gmail password or app-specific password
    }
})
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <form action="/send-mail" method="post">
            <label for="email">To:</label>
            <input type="email" id="email" name="email" placeholder="your-email@gmail" required>
            <button type="submit">Send Mail</button>
        </form>
        `);
});
const mailOptions = {
    from: "sanjayv971128@gmail.com",
    to: "sanjaysharma28111997@gmail.com",
    subject: "Test Email",
    text: "Hello mail send successfully",

}


transport.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Failed to send email" });
    } else {
        console.log('Email sent: ' + info.response);
        res.json({ success: true, message: "Mail sent Successfully!" });
    }
});




app.listen(8080, () => {
    console.log(`Server is running on 8080`);
})