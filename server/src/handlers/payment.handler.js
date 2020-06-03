const { Payment } = require("../models/payment.model");
const { ErrorHandler } = require("../helpers/error.helpers")

const getAllPayments = (req, res, next) => {
  Payment.find({}, (error, allPayments) => {
    try {
      if (error) next(error)
      if (!allPayments || allPayments.length === 0) {
        throw new ErrorHandler(404, "Couldn't find any payment methods")
      }
      res.allPayments = allPayments;
      next();
    } catch (error) {
      next(error)
    }
  });
};

const createNewPayment = (req, res, next) => {
  const paymentData = req.body
  Payment.create(paymentData, (error, newPayment) => {
    try {
      if (error) next(error)
      if(!newPayment) throw new ErrorHandler(400, "Couldn't create new payment")
      res.newPayment = newPayment
      next()
    } catch (error) {
      next(error)
    }
  })
}

// Hämta ut alla shipping methods ur databasen och returnera

module.exports = { getAllPayments, createNewPayment };
