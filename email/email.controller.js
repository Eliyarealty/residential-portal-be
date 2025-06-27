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

exports.getEmailsByAssignedUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Invalid user ID",
        result: null,
      });
    }

    const emails = await emailService.getEmailsAssignedToUser(userId);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Emails fetched successfully",
      result: emails,
    });
  } catch (error) {
    console.error("Error fetching assigned emails:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error",
      result: null,
    });
  }
};

exports.getEmailsByAssignedUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Invalid user ID",
        result: null,
      });
    }

    const emails = await emailService.getEmailsByAssignedUserId(userId);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Emails fetched successfully",
      result: emails,
    });
  } catch (error) {
    console.error("Error fetching assigned emails:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error",
      result: null,
    });
  }
};
