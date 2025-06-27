const express = require("express");
const router = express.Router();
const userController = require("./users.controller");

router.put("/email/:id/assign", userController.assignEmailToUser);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/", userController.getUser);
router.get("/:userId", userController.getUserById);
router.put("/change-password", userController.changePassword);
router.delete("/", userController.deleteAccount);

module.exports = router;
