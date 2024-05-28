const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const config = require("config");

async function sendMail(to, subject = "", content, html) {
    let transporter = nodemailer.createTransport({
        host: config.get('email.host'),
        auth: {
            user: config.get('email.user'),
            pass: process.env.email_password,
        },
    });

    await transporter.sendMail({
        from: 'ab786219@gmail.com',
        to: to,
        subject,
        text: content,
        html: html
    });

}



module.exports = {
    sendMail
}