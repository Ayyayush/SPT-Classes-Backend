import nodemailer from "nodemailer";

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL ENV VARIABLES MISSING");
}

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY, // MUST be App Password
  },
});

export default transporter;
