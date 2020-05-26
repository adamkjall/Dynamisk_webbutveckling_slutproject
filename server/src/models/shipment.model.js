const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ShipmentSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  deliveryTime: {
    type: Number,
    required: true,
  },
});

const Shipment = mongoose.model("Shipment", ShipmentSchema);

module.exports = { Shipment, ShipmentSchema };
