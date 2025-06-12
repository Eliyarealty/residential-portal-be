const express = require("express");
const router = express.Router();
const propertyController = require("./property.controller");
const upload = require("../utils/cloudinary");
const verifyToken = require("../user/user.service").verifyToken;

router.get("/latest", propertyController.getLatestProperties);
router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "propertyImages", maxCount: 5 },
    { name: "profileImage", maxCount: 1 },
  ]),
  propertyController.createProperty
);

router.get("/", propertyController.getProperties);
router.get("/buy", propertyController.getBuyProperties);
router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);
router.put("/:id", propertyController.updateProperty);
router.delete("/:id", propertyController.deleteProperty);

module.exports = router;
