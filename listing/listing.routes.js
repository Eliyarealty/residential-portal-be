const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

const listingController = require("./listing.controller");

// CREATE listing (with image)
router.post("/", upload.single("image"), listingController.createListing);

// READ all listings
router.get("/", listingController.getAllListings);

// READ single listing by ID
router.get("/:id", listingController.getListingById);

// UPDATE listing (with optional image)
router.put("/:id", upload.single("image"), listingController.updateListing);

// DELETE listing
router.delete("/:id", listingController.deleteListing);

module.exports = router;
