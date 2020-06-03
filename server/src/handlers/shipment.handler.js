const { Shipment } = require("../models/shipment.model");
const { ErrorHandler } = require("../helpers/error.helpers")

const getAllShipments = (req, res, next) => {
  Shipment.find({}, (error, allShipments) => {
    try {
      if (error) next(error)
      if (!allShipments || allShipments.length === 0) {
        throw new ErrorHandler(404, "Couldn't GET all shipments")
      } else {
        res.allShipments = allShipments;
        next();
      }
    } catch (error) {
      next(error)
    }
  });
};

const createNewShipping = (req, res, next) => {
  const shippingData = req.body
  Shipment.create(shippingData, (error, newShipment) => {
    try {
      if (error) next(error)
      if (!newShipment) throw new ErrorHandler(400, "Couldn't create new shipment")
      res.newShipment = newShipment
      next()
    } catch (error) {
      next(error)
    }
  })
}

// Hämta ut alla shipping methods ur databasen och returnera

module.exports = { getAllShipments, createNewShipping };
