const { Shipment } = require("../models/shipment.model");

const getAllShipments = (req, res, next) => {
  Shipment.find({}, (err, allShipments) => {
    if (err) {
      res.status(500).json({ message: "Couldn't perform shipment get" });
    } else if (!allShipments) {
      res.status(404).json({ message: "Couldn't find any shipments" })
    } else {
      res.allShipments = allShipments;
      next();
    }
  });
};

const createNewShipping = (req, res, next) => {
  const shippingData = req.body
  Shipment.create(shippingData, (err, newShipment) => {
    if(err) {
      res.status(500).json({ message: "Couldn't create shipment" });
    } else if (!newShipment) {
      res.status(500).json({ message: "Couldn't create shipment" });
    } else {
      res.newShipment = newShipment
      next()
    }
  })
}

// Hämta ut alla shipping methods ur databasen och returnera

module.exports = { getAllShipments, createNewShipping };
