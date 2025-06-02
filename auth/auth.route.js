const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.post("/verify-token", userController.verifyToken);

module.exports = router;
