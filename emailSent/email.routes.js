const express = require("express");
const router = express.Router();
const emailController = require("./email.controller");

router.post("/send", emailController.sendEmail);

module.exports = router;
