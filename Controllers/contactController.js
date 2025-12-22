import transporter from "../utils/mailer.js";

export const sendContactMail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    await transporter.sendMail({
      from: `"SPT Classes" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `,
    });

    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Email failed" });
  }
};
