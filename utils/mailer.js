import nodemailer from "nodemailer";

if (
  !process.env.SMTP_HOST ||
  !process.env.SMTP_PORT ||
  !process.env.SMTP_USER ||
  !process.env.SMTP_PASS
) {
  console.error("❌ SMTP ENV VARIABLES MISSING");
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,               // smtp-relay.brevo.com
  port: Number(process.env.SMTP_PORT),       // 587
  secure: false,
  auth: {
    user: process.env.SMTP_USER,             // apikey
    pass: process.env.SMTP_PASS,             // xkeysib-xxxx
  },
});

export default transporter;
