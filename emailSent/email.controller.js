const emailService = require("./email.service");
const createError = require("http-errors");

class EmailController {
  async sendEmail(req, res, next) {
    try {
      const { to, subject, message } = req.body;

      // Validate required fields
      if (!to || !subject || !message) {
        throw createError(400, "To, subject, and message are required");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(to)) {
        throw createError(400, "Invalid email format");
      }

      await emailService.sendEmail(to, subject, message);

      res.status(200).json({
        status: true,
        message: "Email sent successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EmailController();
