const express = require("express");
const router = express.Router();

/* MIDDLEWARES */
const isAuthenticated = require("../middlewares/isAuthenticated");

/* HANDLERS */
const {
  getAllPayments,
  createNewPayment
} = require("../handlers/payment.handler");

//GET PAYMENT METHODS
router.get("/", isAuthenticated, getAllPayments, (req, res) => {
  res.status(200).json(res.allPayments);
});

//POST NEW SHIPPING METHOD
router.post("/", createNewPayment, (req, res) => {
  res.status(200).json({ message: "New payment created", body: res.newPayment })
})


module.exports = router;