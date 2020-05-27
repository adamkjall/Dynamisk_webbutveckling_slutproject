const express = require("express");
const router = express.Router();

// const { Shipment } = require("../models/shipment.model");

/* MIDDLEWARES */
const isAuthenticated = require("../middlewares/isAuthenticated");

/* HANDLERS */
const {
  getAllShipments,
  createNewShipping
} = require("../handlers/shipment.handler");

/* ENDPOINTS */

//GET SHIPPING METHODS
router.get("/", isAuthenticated, getAllShipments, (req, res) => {
  res.status(200).json(res.allShipments);
});

//POST NEW SHIPPING METHOD
router.post("/", createNewShipping, (req, res) => {
  res.status(200).json({ message: "New shipment created", body: res.newShipment })
})

module.exports = router;