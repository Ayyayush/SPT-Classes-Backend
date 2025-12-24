import transporter from "../utils/mailer.js";

export const sendContactMail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Send email via Brevo
    await transporter.sendMail({
      from: "SPT Classes <projectmail.dev@gmail.com>", // ✅ VERIFIED BREVO SENDER
      to: "projectmail.dev@gmail.com",                 // ✅ YOU receive all mails
      replyTo: email,                                  // ✅ reply goes to user
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

    // 3️⃣ Success response
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
