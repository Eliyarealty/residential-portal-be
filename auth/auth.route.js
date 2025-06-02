const express = require("express");
const router = express.Router();
const userController = require("./auth.controller");

router.post("/verify-token", userController.verifyToken);

module.exports = router;
