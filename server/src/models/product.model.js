const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const sizesSubSchema = mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
}, { _id: false })

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sizes: [sizesSubSchema],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product, ProductSchema };
