const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./users.model");
const Email = require("../email/email.model");
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async ({
  name,
  email,
  password,
  phoneNumber,
  companyName,
}) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("Email already registered");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    companyName,
  });

  return { userId: user.id };
};

exports.signin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    companyName: user.companyName,
    token,
  };
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
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

  const hashed = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashed });

  return { success: true };
};

exports.getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
};

exports.getUserById = async (userId) => {
  return await User.findOne({
    where: { id: userId },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
};

exports.deleteUserAccount = async (userId) => {
  const deleted = await User.destroy({ where: { id: userId } });
  if (!deleted) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return "User account deleted successfully";
};

exports.assignEmailToUser = async (emailId, userId) => {
  const email = await Email.findByPk(emailId);
  if (!email) {
    throw new Error("Email not found");
  }

  email.assignedToUserId = userId;
  await email.save();

  return email;
};
