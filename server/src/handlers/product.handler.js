const { Product } = require("../models/product.model");

const getAllProducts = (req, res, next) => {
    Product.find({}, (err, allProducts) => {
        if(err) res.status(500).json({ message: "Couldn't get all products"});
        res.allProducts = allProducts
        next();
    })
}

//getOneProduct
const getProductsById = (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        if(err) res.status(404).json({ message: "Couldn't find product" });
        res.product = product
        next();
    })
}

//GetProductsByCategory

const createProduct = (req, res, next) => {
    const productData = {
        title: req.body.title,
        desc: req.body.desc,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        sizes: [{size: req.body.size, stock: req.body.stock}]
    }

    Product.create(productData, (err, product) => {
        if(err){
            res.status(400).json(err)
        }else{
            res.status(201).json({message: product})
        }
    })
}

//updateProduct


//deleteProduct
const deleteProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        if (err)
        res.status(500).json({ message: "Couldn't perform product deletion" });
      res.deletedProduct = deletedProduct;
      next();
    });
}

module.exports = {getAllProducts, getProductsById, createProduct, deleteProduct}