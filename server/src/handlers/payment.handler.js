const { Payment } = require("../models/payment.model");

const getAllPayments = (req, res, next) => {
    Payment.find({}, (err, allPayments) => {
    if (err) {
      res.status(500).json({ message: "Couldn't perform payment get" });
    } else if (!allPayments) {
      res.status(404).json({ message: "Couldn't find any payments" })
    } else {
      res.allPayments = allPayments;
      next();
    }
  });
};

const createNewPayment = (req, res, next) => {
  const paymentData = req.body
  Payment.create(paymentData, (err, newPayment) => {
    if(err) {
      res.status(500).json({ message: "Couldn't create payment" });
    } else if (!newPayment) {
      res.status(500).json({ message: "Couldn't create payment" });
    } else {
      res.newPayment = newPayment
      next()
    }
  })
}

// Hämta ut alla shipping methods ur databasen och returnera

module.exports = { getAllPayments, createNewPayment };
