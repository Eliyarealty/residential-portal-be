const express = require("express");
const router = express.Router();

const buyController = require("./buy.controller");

// CREATE buy request
router.post("/", buyController.createBuy);

// READ all buy requests
router.get("/", buyController.getAllBuys);

// READ single buy request by ID
router.get("/:id", buyController.getBuyById);

// UPDATE buy request
router.put("/:id", buyController.updateBuy);

// DELETE buy request
router.delete("/:id", buyController.deleteBuy);

module.exports = router;
