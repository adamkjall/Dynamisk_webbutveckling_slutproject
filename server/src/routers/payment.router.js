const express = require("express");
const router = express.Router();

module.exports = router
const { Payment } = require("../models/payment.model");

//GET PAYMENT METHODS
router.get("/", (req, res) => {
  res.status(200).json({ message: "endpoint: Get payment methods" });
});

module.exports = router;
