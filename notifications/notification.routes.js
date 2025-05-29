const express = require("express");
const router = express.Router();
const notificationController = require("./notification.controller");

// GET all notifications
router.get("/", notificationController.getAllNotifications);
router.patch("/mark-read", notificationController.markNotificationAsRead);

module.exports = router;
