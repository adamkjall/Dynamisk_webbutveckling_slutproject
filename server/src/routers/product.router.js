/* EXPRESS SETUP */
const express = require("express");
const router = express.Router();

/* MODELS */
const { Product } = require("../models/product.model");

/* MIDDLEWARES */
const isAuthenticated = require("../middlewares/isAuthenticated");

/* HANDLERS */

/* ENDPOINTS */

//GET ALL PRODUCTS
router.get("/", (req, res) => {
  res.status(200).json({ message: "endpoint: Get all products" });
});

//GET ONE PRODUCT
router.get("/:id", (req, res) => {
  res.status(200).json({
    message: "endpoint: Get specfic product by id",
    params: req.params,
  });
});

//GET ALL PRODUCTS IN A CATEGORY
router.get("/category/:id", (req, res) => {
  res
    .status(200)
    .json({ message: "endpoint: Get product by category", params: req.params });
});

//CREATE PRODUCT
router.post("/", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "endpoint: create product", body: req.body });
});

//UPDATE PRODUCT
router.put("/:id", isAuthenticated, (req, res) => {
  res.status(200).json({
    message: "endpoint: Update specific product by id",
    params: req.params,
    body: req.body,
  });
});

// DELETE PRODUCT
router.delete("/:id", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "endpoint: delete product" });
});

module.exports = router;
