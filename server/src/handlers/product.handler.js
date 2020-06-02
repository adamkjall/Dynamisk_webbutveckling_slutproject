const { Product } = require("../models/product.model");

/* GET ALL PRODUCTS */
const getAllProducts = (req, res, next) => {
  Product.find({}, (err, allProducts) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Couldn't perform get for all products" });
    } else if (!allProducts) {
      res.status(404).json({ message: "Couldn't find all products" });
    } else {
      res.allProducts = allProducts;
      next();
    }
  });
};

/* GET ONE PRODUCT BY ID */
const getProductsById = (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      res.status(500).json({ message: "Couldn't perform product get" });
    } else if (!product) {
      res.status(404).json({ message: "Couldn't find product" });
    } else {
      res.product = product;
      next();
    }
  });
};

/* GET PRODUCT BY CATEGORY */
const getProductsByCategory = (req, res, next) => {
  Product.find({ category: req.params.category }, (err, foundProducts) => {
    if (err)
      res
        .status(500)
        .json({ message: "Couldn't find any products in this category" });
    res.foundProducts = foundProducts;
    next();
  });
};

/* CREATE PRODUCT */
const createProduct = (req, res, next) => {
  Product.create(req.body, (err, createdProduct) => {
    if (err) res.status(500).json({ message: "Couldn't create product" });
    res.createdProduct = createdProduct;
    next();
  });
};

/* UPDATE PRODUCT */
const updateProduct = (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedProduct) => {
      if (err)
        res.status(500).json({ message: "Couldn't perform product update" });
      res.updatedProduct = updatedProduct;
      next();
    }
  );
};

/* DELETE PRODUCT */
const deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
    if (err) {
      res.status(500).json({ message: "Couldn't perform product deletion" });
    } else if (!deletedProduct) {
      res.status(404).json({ message: "Couldn't find product" });
    } else {
      res.deletedProduct = deletedProduct;
      next();
    }
  });
};

module.exports = {
  getAllProducts,
  getProductsById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
