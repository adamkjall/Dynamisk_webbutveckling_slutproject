const express = require("express");
const router = express.Router();

/* MIDDLEWARES */
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");

/* HANDLERS */
const {
  getAllPayments,
  createNewPayment,
} = require("../handlers/payment.handler");

//GET PAYMENT METHODS
router.get("/", getAllPayments, (req, res) => {
  res.status(200).json(res.allPayments);
});

//POST NEW SHIPPING METHOD
router.post("/", isAuthenticated, isAdmin, createNewPayment, (req, res) => {
  res
    .status(200)
    .json({ message: "New payment created", body: res.newPayment });
});

module.exports = router;
