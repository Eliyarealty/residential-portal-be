const userService = require("./users.service");

exports.signup = async (req, res) => {
  try {
    const result = await userService.signup(req.body);
    res.status(201).json({ code: 201, message: "User registered", result });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ code: error.status || 500, message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const result = await userService.signin(req.body);
    res.status(200).json({ code: 200, message: "Login successful", result });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ code: error.status || 500, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const result = await userService.changePassword(
      userId,
      oldPassword,
      newPassword
    );
    res.status(200).json({ code: 200, message: "Password updated", result });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ code: error.status || 500, message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({ code: 200, message: "Users fetched", result });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, message: "Internal error", result: null });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (!user)
      return res.status(404).json({ code: 404, message: "User not found" });

    res.status(200).json({ code: 200, message: "User fetched", result: user });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Internal error" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const message = await userService.deleteUserAccount(userId);
    res.status(200).json({ message });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.assignEmailToUser = async (req, res) => {
  const emailId = req.params.id;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const updatedEmail = await userService.assignEmailToUser(emailId, userId);
    res.status(200).json({ result: updatedEmail });
  } catch (error) {
    console.error("Error assigning email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
