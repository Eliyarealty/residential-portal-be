const express = require("express");
const router = express.Router();
const emailController = require("./email.controller");
const { verifyToken } = require("../verify/auth");

router.post("/", emailController.createEmail);
router.get("/", verifyToken, emailController.getAllEmails);
router.get("/:id", emailController.getEmailById);
router.put("/:id", emailController.updateEmail);
router.delete("/:id", emailController.deleteEmail);

module.exports = router;
