const userService = require("./auth.service");

exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.body; // Extract token from the request body
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const isValid = await userService.verifyToken(token);
    if (isValid) {
      return res.status(200).json({ message: "Token is valid" });
    } else {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
