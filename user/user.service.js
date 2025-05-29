const bcrypt = require("bcrypt");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async ({ fullname, email, password, phone, isAgent }) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error("Email already registered");
      error.status = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phone,
      isAgent,
    });

    return { userId: user.id };
  } catch (error) {
    // Re-throw error to be handled by controller
    throw error;
  }
};

exports.signin = async ({ email, password }) => {
  try {
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.isAgent ? "admin" : "user",
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      userId: user.id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      isAgent: user.isAgent,
      token,
    };
  } catch (error) {
    console.error("Signin error:", error.message, error.stack);
    throw error;
  }
};

// JWT Middleware for protected routes
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"
  console.log("Authorization Header:", req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "No token provided",
      result: null,
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    console.error("Token verification error:", error.message, error.stack);
    res.status(401).json({
      code: 401,
      message: "Invalid or expired token",
      result: null,
    });
  }
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
  if (!userId || !oldPassword || !newPassword) {
    const error = new Error("All fields are required");
    error.status = 400;
    throw error;
  }

  const user = await User.findByPk(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    const error = new Error("Old password is incorrect");
    error.status = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashedPassword });

  return { user: user };
};

exports.getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"], // exclude sensitive fields
      },
    });
    return users;
  } catch (error) {
    throw error;
  }
};

// services/user.service.js
exports.getUserById = async (userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

exports.deleteUserAccount = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const deleted = await User.destroy({ where: { id: userId } });

  if (!deleted) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return "User account deleted successfully";
};
