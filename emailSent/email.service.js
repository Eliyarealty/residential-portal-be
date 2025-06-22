const nodemailer = require("nodemailer");
const createError = require("http-errors");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to, subject, message) {
    try {
      await this.transporter.sendMail({
        from: `"Residential Portal" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html: message,
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      throw createError(500, "Failed to send email");
    }
  }
}

module.exports = new EmailService();
