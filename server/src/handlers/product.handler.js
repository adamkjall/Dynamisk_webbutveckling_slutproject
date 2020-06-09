const { Product } = require("../models/product.model");
const { ErrorHandler } = require("../helpers/error.helpers");

/* GET ALL PRODUCTS */
const getAllProducts = (req, res, next) => {
  Product.find({}, (error, products) => {
    try {
      if (error) next(error);
      if (!products || products.length === 0) {
        throw new ErrorHandler(404, "Couldn't find any products");
      } else {
        res.allProducts = products;
        next();
      }
    } catch (error) {
      next(error);
    }
  });
};

/* GET ONE PRODUCT BY ID */
const getProductsById = (req, res, next) => {
  Product.findById(req.params.id, (error, product) => {
    try {
      if (error) next(error);
      if (!product) throw new ErrorHandler(404, "Couldn't find product");
      res.product = product;
      return product;
      next();
    } catch (error) {
      next(error);
    }
  });
};

/* GET PRODUCT BY CATEGORY */
const getProductsByCategory = (req, res, next) => {
  Product.find({ category: req.params.category }, (error, products) => {
    try {
      if (error) next(error);
      if (!products || products.length === 0) {
        throw new ErrorHandler(404, "Couldn't find products and/or category");
      } else {
        res.products = products;
        next();
      }
    } catch (error) {
      next(error);
    }
  });
};

/* CREATE PRODUCT */
const createProduct = (req, res, next) => {
  Product.create(req.body, (error, createdProduct) => {
    try {
      if (error) next(error);
      if (!createdProduct)
        throw new ErrorHandler(400, "Couldn't create product");
      res.createdProduct = createdProduct;
      next();
    } catch (error) {
      next(error);
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
      if (error) next(error);
      try {
        if (!product) {
          throw new ErrorHandler(404, "Couldn't find product to update");
        } else {
          res.updatedProduct = product;
          next();
        }
      } catch (error) {
        next(error);
      }
    }
  );
};

/* DELETE PRODUCT */
const deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (error, deletedProduct) => {
    try {
      if (error) next(error);
      if (!deletedProduct)
        throw new ErrorHandler(404, "Couldn't find product to delete");
      res.deletedProduct = deletedProduct;
      next();
    } catch (error) {
      next(error);
    }
  });
};

const checkProductStock = async (req, res, next) => {
  const products = req.body.products;

  try {
    for (const product of products) {
      const dbProduct = await Product.findById(product._id, (error, doc) => {
        if (error) next(error)
        return doc
      })
      if (!dbProduct) {
        throw new ErrorHandler(500, "Product is no longer available on site")
      }
      const indexOfSize = dbProduct.sizes.findIndex(
        el => el.size === product.selectedSize
      )
      if (indexOfSize === -1) {
        throw new ErrorHandler(500, "Product size is no longer available on site")
      }
      if (dbProduct.sizes[indexOfSize].stock - product.quantity < 0) {
        throw new ErrorHandler(500, "Product is no longer in stock")
      }
    }
  } catch (error) {
    next(error)
  }

  next()
  /* 
    TODO make sure we throw error if one of the products is out of stock
  */
  // try {
  //   for await (const product of products) {
  //     const res = await Product.findById(product._id, (error, doc) => {
  //       if (error) next(error);

  //       const indexOfSize = doc.sizes.findIndex(
  //         (el) => el.size === product.selectedSize
  //       );

  //       // if product will be less than 0 after purchase throw error
  //       if (doc.sizes[indexOfSize].stock - product.quantity < 0) {
  //         throw new ErrorHandler(404, "Product is out of stock");
  //       }
  //     });
  //   }
  // } catch (error) {
  //   next(error);
  // }
  // next();
};

const decrementProductStock = (products) => {
  products.forEach((product) => {
    Product.findById(product._id, (error, doc) => {
      if (error) throw new ErrorHandler(400, "Couldn't find product");

      const index = doc.sizes.findIndex(
        (el) => el.size === product.selectedSize
      );
      doc.sizes[index].stock -= product.quantity;
      doc.save();
    });
  });
};

module.exports = {
  getAllProducts,
  getProductsById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  checkProductStock,
  decrementProductStock,
};
