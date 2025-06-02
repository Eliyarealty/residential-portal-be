const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

exports.verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify the token
    return !!decoded; // If decoding is successful, token is valid
  } catch (error) {
    console.error("Token verification error:", error);
    return false; // Token is invalid or expired
  }
};
