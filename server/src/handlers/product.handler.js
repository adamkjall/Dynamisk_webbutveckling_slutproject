const { Product } = require("../models/product.model");
const { ErrorHandler } = require("../helpers/error.helpers")

/* GET ALL PRODUCTS */
const getAllProducts = (req, res, next) => {
  Product.find({}, (error, products) => {
    try {
      if (error) next(error)
      if (!products || products.length === 0) {
        throw new ErrorHandler(404, "Couldn't find any products")
      } else {
        res.allProducts = products
        next();
      }
    } catch (error) {
      next(error)
    }
  })
};

/* GET ONE PRODUCT BY ID */
const getProductsById = (req, res, next) => {
  Product.findById(req.params.id, (error, product) => {
    try {
      if (error) next(error)
      if (!product) throw new ErrorHandler(404, "Couldn't find product")
      res.product = product
      return product
      next()
    } catch (error) {
      next(error)
    }
  })
};

/* GET PRODUCT BY CATEGORY */
const getProductsByCategory = (req, res, next) => {
  Product.find({ category: req.params.category }, (error, products) => {
    try {
      if (error) next(error)
      if (!products || products.length === 0) {
        throw new ErrorHandler(404, "Couldn't find products and/or category")
      } else {
        res.products = products
        next()
      }
    } catch (error) {
      next(error)
    }
  });
};

/* CREATE PRODUCT */
const createProduct = (req, res, next) => {
  Product.create(req.body, (error, createdProduct) => {
    try {
      if (error) next(error)
      if (!createdProduct) throw new ErrorHandler(400, "Couldn't create product")
      res.createdProduct = createdProduct;
      next();
    } catch (error) {
      next(error)
    }
  });
};

/* UPDATE PRODUCT */
const updateProduct = (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, product) => {
      try {
        if (error) next(error)
        if (!product) {
          throw new ErrorHandler(404, "Couldn't find product to update")
        } else {
          res.updatedProduct = product
          next()
        }
      } catch (error) {
        next(error)
      }
    }
  );

};

/* DELETE PRODUCT */
const deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (error, deletedProduct) => {
    try {
      if (error) next(error)
      if (!deletedProduct) throw new ErrorHandler(404, "Couldn't find product to delete")
      res.deletedProduct = deletedProduct;
      next();
    } catch (error) {
      next(error)
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
