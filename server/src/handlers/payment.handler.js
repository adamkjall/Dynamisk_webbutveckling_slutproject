const { Payment } = require("../models/payment.model");

const getAllPayments = (req, res, next) => {
  Payment.find({}, (error, allPayments) => {
    if (error) next(error)
    res.allPayments = allPayments;
    next();
  });
};

const createNewPayment = (req, res, next) => {
  const paymentData = req.body
  Payment.create(paymentData, (error, newPayment) => {
    if (error) next(error)
    res.newPayment = newPayment
    next()
  })
}

// Hämta ut alla shipping methods ur databasen och returnera

module.exports = { getAllPayments, createNewPayment };
