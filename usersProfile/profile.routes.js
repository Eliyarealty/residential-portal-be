const express = require("express");
const router = express.Router();
const userProfileController = require("./profile.controller");
const upload = require("../utils/cloudinary"); // now this is multer instance

// user.route.js or wherever your routes are defined
router.put(
  "/:userId",
  upload.single("profilePicture"),
  userProfileController.updateUserProfile
);

router.get("/:userId", userProfileController.getUserProfile);

module.exports = router;
