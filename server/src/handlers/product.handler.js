const { Product } = require("../models/product.model");

/* GET ALL PRODUCTS */
const getAllProducts = (req, res, next) => {
  Product.find()
    .exec(async (error, allProducts) => {
      if (error) next(error)
      res.allProducts = allProducts
      next();
    });
};

/* GET ONE PRODUCT BY ID */
const getProductsById = (req, res, next) => {
  Product.findById(req.params.id, (error, product) => {
    if (error) next(error)
    res.product = product;
    next();
  });
};

/* GET PRODUCT BY CATEGORY */
const getProductsByCategory = (req, res, next) => {
  Product.find({ category: req.params.category }, (error, foundProducts) => {
    if (error) next(error)
    res.foundProducts = foundProducts;
    next();
  });
};

/* CREATE PRODUCT */
const createProduct = (req, res, next) => {
  Product.create(req.body, (error, createdProduct) => {
    if (error) next(error)
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
    (error, updatedProduct) => {
      if (error) next(error)
      res.updatedProduct = updatedProduct;
      next();
    }
  );
};

/* DELETE PRODUCT */
const deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (error, deletedProduct) => {
    if (error) next(error)
    res.deletedProduct = deletedProduct;
    next();
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
