import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,          // smtp-relay.brevo.com
  port: Number(process.env.SMTP_PORT),  // 587
  secure: false,
  auth: {
    user: process.env.SMTP_USER,        // apikey
    pass: process.env.SMTP_PASS,        // xkeysib-xxxxxxxx
  },
});

export default transporter;
