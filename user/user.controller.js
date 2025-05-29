const userService = require("./user.service");

exports.signup = async (req, res) => {
  try {
    const result = await userService.signup(req.body);
    res.status(201).json({
      code: 201,
      message: "User registered successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.status || 500,
      message: error.message || "Server error",
      result: null,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const result = await userService.signin(req.body);
    res.status(200).json({
      code: 200,
      message: "User signed in successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.status || 500,
      message: error.message || "Server error",
      result: null,
    });
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

    res.status(200).json({
      code: 200,
      message: "Password changed successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.status || 500,
      message: error.message || "Server error",
      result: null,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Users fetched successfully",
      result: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      result: null,
    });
  }
};

// controllers/user.controller.js
exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
        result: null,
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "User fetched successfully",
      result: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);

    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      result: null,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body; // destructure userId from body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const message = await userService.deleteUserAccount(userId);

    res.status(200).json({ message });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};
