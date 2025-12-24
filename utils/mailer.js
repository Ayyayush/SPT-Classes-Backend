import nodemailer from "nodemailer";

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL ENV VARIABLES MISSING");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service:"gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // MUST be App Password
  },
});

export default transporter;
