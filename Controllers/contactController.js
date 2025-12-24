import transporter from "../utils/mailer.js";

export const sendContactMail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🔒 Ensure Brevo SMTP is configured
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      return res.status(500).json({
        success: false,
        message: "Mail service not configured",
      });
    }

    await transporter.sendMail({
      from: "SPT Classes <noreply@brevo.com>",   // Brevo-safe sender
      to: "yourgmail@gmail.com",                 // where YOU want to receive mails
      replyTo: email,                            // user's email
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("❌ Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};
