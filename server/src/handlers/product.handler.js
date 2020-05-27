const { Product } = require("../models/product.model");

const getAllProducts = (req, res, next) => {
    Product.find({}, (err, allProducts) => {
        if(err) {
            res.status(500).json({ message: "Couldn't perform get for all products"});
        } else if (!allProducts) {
            res.status(404).json({ message: "Couldn't find all products"});
        } else {
            res.allProducts = allProducts
            next();
        }
    })
}

//getOneProduct
const getProductsById = (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        if(err) {
            res.status(500).json({ message: "Couldn't perform product get" });
        } else if (!product) {
            res.status(404).json({ message: "Couldn't find product" });
        } else {
            res.product = product
            next();
        }   
    })
}

//GetProductsByCategory


//CreateProduct
const createProduct = (req, res, next) => {
    const productData = req.body
    Product.create(productData, (err, product) => {
        if(err){
            res.status(500).json(err)
        }else{
            res.status(201).json({message: product})
        }
    })
}

//updateProduct
const updateProduct = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id,
      req.body,
      { new: true },
      (err, updatedProduct) => {
        if (err) {
          res.status(500).json({ message: "Couldn't perform product update" });
        } 
        res.updatedProduct = updatedProduct;
        next();
      }
    );
  };

//deleteProduct
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
}

module.exports = {getAllProducts, getProductsById, createProduct, updateProduct, deleteProduct}