const nodemailer = require("nodemailer");

const {SERVER_NAME,EMAIL_PASSWORD} = process.env;

const nodemailerConfig = {
    host: SERVER_NAME,
    port: 465,
    secure: true,
    auth: {
        user: "olexandra.holubtsova@gmail.com",
        pass: EMAIL_PASSWORD
    }
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async(data)=> {
    const email = {
        ...data, 
        from: "olexandra.holubtsova@gmail.com",
    }
    await transporter.sendMail(email);
};

module.exports = sendEmail;