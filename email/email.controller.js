const emailService = require("./email.service");

exports.createEmail = async (req, res) => {
  try {
    const response = await emailService.createEmail(req.body);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(error.status || 500).json({
      status: "error",
      code: error.status || 500,
      message: error.message || "Internal server error",
    });
  }
};

exports.getAllEmails = async (req, res) => {
  try {
    const receiverEmail = req.query.receiverEmail; // Get from query param
    const response = await emailService.getAllEmails(receiverEmail);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: error.message || "Internal server error",
    });
  }
};

exports.getEmailById = async (req, res) => {
  try {
    const response = await emailService.getEmailById(req.params.id);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(error.status || 500).json({
      status: "error",
      code: error.status || 500,
      message: error.message || "Internal server error",
    });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const response = await emailService.updateEmail(req.params.id, req.body);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(error.status || 500).json({
      status: "error",
      code: error.status || 500,
      message: error.message || "Internal server error",
    });
  }
};

exports.deleteEmail = async (req, res) => {
  try {
    const response = await emailService.deleteEmail(req.params.id);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(error.status || 500).json({
      status: "error",
      code: error.status || 500,
      message: error.message || "Internal server error",
    });
  }
};
