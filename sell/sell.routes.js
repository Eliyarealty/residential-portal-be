// routes/sellRoutes.js
const express = require("express");
const router = express.Router();
const sellController = require("./sell.controller");

router.post("/", sellController.submitSellRequest);

module.exports = router;
