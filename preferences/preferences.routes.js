// routes/preferences.routes.js
const express = require("express");
const router = express.Router();
const preferenceController = require("./preferences.controller");

router.get("/user/:userId", preferenceController.getPreferenceByUserId);
router.post("/", preferenceController.createPreference);
router.get("/", preferenceController.getAllPreferences);
router.get("/:id", preferenceController.getPreferenceById);
router.put("/:id", preferenceController.updatePreference);
router.delete("/:id", preferenceController.deletePreference);

module.exports = router;
