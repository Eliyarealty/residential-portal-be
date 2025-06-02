const jwt = require("jsonwebtoken");

app.post("/api/v2/auth/verify-token", (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, decoded });
  } catch (err) {
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
});
