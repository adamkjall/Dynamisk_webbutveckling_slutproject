const express = require("express");
const router = express.Router();

/* MIDDLEWARES */
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");

/* HANDLERS */
const {
  getAllShipments,
  createNewShipping,
} = require("../handlers/shipment.handler");

/* ENDPOINTS */

//GET SHIPPING METHODS
router.get("/", getAllShipments, (req, res) => {
  res.status(200).json(res.allShipments);
});

//POST NEW SHIPPING METHOD
router.post("/", isAuthenticated, isAdmin, createNewShipping, (req, res) => {
  res
    .status(200)
    .json({ message: "New shipment created", body: res.newShipment });
});

module.exports = router;
