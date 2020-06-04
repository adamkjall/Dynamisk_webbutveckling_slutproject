/* EXPRESS SETUP */
const express = require("express");
const router = express.Router();

/* MODELS */
const { Product } = require("../models/product.model");

/* MIDDLEWARES */
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");

/* HANDLERS */
const { getSessionUser } = require("../handlers/user.handler");
const {
  getAllProducts,
  getProductsById,
  getProductsByCategory,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../handlers/product.handler");

/* ENDPOINTS */

//GET ALL PRODUCTS
router.get("/", getAllProducts, (req, res) => {
  res.status(200).json(res.allProducts);
});

//GET ONE PRODUCT
router.get("/:id", getProductsById, (req, res) => {
  res.status(200).json(res.product);
});

//GET ALL PRODUCTS IN A CATEGORY
router.get("/category/:category", getProductsByCategory, (req, res) => {
  res.status(200).json(res.foundProducts);
});

//CREATE PRODUCT
router.post(
  "/",
  isAuthenticated,
  getSessionUser,
  isAdmin,
  createProduct,
  (req, res) => {
    res.status(200).json(res.createdProduct);
  }
);

//UPDATE PRODUCT
router.put(
  "/:id",
  isAuthenticated,
  getSessionUser,
  isAdmin,
  updateProduct,
  (req, res) => {
    res.status(200).json(res.updatedProduct);
  }
);

// DELETE PRODUCT
router.delete(
  "/:id",
  isAuthenticated,
  getSessionUser,
  isAdmin,
  deleteProduct,
  (req, res) => {
    res.status(200).json(res.deletedProduct);
  }
);

module.exports = router;
