const express = require("express");
const router = express.Router();

module.exports = router
const { Shipment } = require("../models/shipment.model");

//GET SHIPPING METHODS
router.get("/", (req, res) => {
  res.status(200).json({ message: "endpoint: Get shipping methods" });
});

module.exports = router;
