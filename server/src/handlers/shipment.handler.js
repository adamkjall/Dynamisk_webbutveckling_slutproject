const { Shipment } = require("../models/shipment.model");

const getAllShipments = (req, res, next) => {
  Shipment.find({}, (error, allShipments) => {
    if (error) next(error)
    res.allShipments = allShipments;
    next();
  });
};

const createNewShipping = (req, res, next) => {
  const shippingData = req.body
  Shipment.create(shippingData, (error, newShipment) => {
    if (error) next(error)
    res.newShipment = newShipment
    next()
  })
}

// Hämta ut alla shipping methods ur databasen och returnera

module.exports = { getAllShipments, createNewShipping };
