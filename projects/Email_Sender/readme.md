
# Email Sender App📧
## Overview

This Email Sender App is a simple web application that allows users to send emails via a web form. The app uses Node.js, Express.js for server-side handling, and Nodemailer for sending emails.

## Features
- Simple and user-friendly contact form.
- Sends emails using Nodemailer.
- Basic form validation.

## Prerequisites
- Node.js installed on your machine.
- A Gmail account for sending emails.





## Installation

1. Clone the Repository:

```bash
  git clone https://github.com/sanjay-lgtm/Nodejs.git
  cd projects/Email_Sender
```
2. Install Dependencies:

```bash
  npm install
```
3. Create a `.env` File:
Create a .env file in the root directory of the project and add your Gmail credentials:

```bash
USER_EMAIL=your-email@gmail.com
USER_PASS=your-email-password
```


## Running the App
1. Start the Server

```bash
  npm start
```

2. Open in Browser
- Navigate to http://localhost:10000 in your web browser.




## Usage

### 1. Fill the Form
Enter your name, email, and message in the contact form.

### 2.Send Email
Click the "Send Email" button to send your message. You should see a confirmation message if the email was sent successfully.
 
### 3.Check Dammy Email
If the sending email check on dammy email then goto (Create temparary email for check mail ):
```bash
https://temp-mail.org/en
```
## Deployment

```bash
https://nodejs-2-o39v.onrender.com/
```



## File Structure

```bash
email-sender-app/
├── node_modules/
├── .env
├── index.html
├── styles.css
├── app.js
├── package.json
└── README.md
```

## Troubleshooting
If you encounter any issues, ensure that:
- Your .env file contains the correct credentials.
- You have enabled "Less secure app access" in your Gmail account settings.
- You have installed all required npm packages.
## License

This project is licensed under the MIT License.
[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@Sanjay](https://github.com/sanjay-lgtm)


## Tech Stack

**Server:** Node, Express
**package:** nodemailer


## Support

For support, email sanjaysharma28111997@gmail.com or join our Slack channel.

