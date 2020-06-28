const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: mongoose.ObjectId,
      ref: "File",
    },
    price: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: String,
        required: true,
      },
    ], 
    sizes: {
      type: [
        {
          size: {
            type: String,
            required: true,
          },
          stock: {
            type: Number,
            required: true,
          },
        },
        { _id: false },
      ],
      required: false,
    },
    selectedSize: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
  },
  {
    id: false,
    toJSON: {
      virtuals: true,
    },
  }
);

ProductSchema.virtual("imageURL").get(function () {
  return process.env.DOMAIN + this.image.toString();
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product, ProductSchema };
