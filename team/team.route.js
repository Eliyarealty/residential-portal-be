const express = require("express");
const router = express.Router();
const upload = require("../utils/cloudinary"); // Adjust path to your config file
const teamController = require("./team.controller");

router.post("/", upload.single("image"), teamController.createTeamMember); // Use single file upload
router.get("/", teamController.getTeamMembers);

module.exports = router;
