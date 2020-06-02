const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({ _id: mongoose.ObjectId });
FileSchema.virtual("imageData", {
  ref: "Chunk",
  localField: "_id",
  foreignField: "files_id",
  justOne: true,
});

const File = mongoose.model("File", FileSchema, "product-images.files");

const ChunkSchema = new mongoose.Schema({
  files_id: mongoose.ObjectId,
  data: "Buffer",
});
const Chunk = mongoose.model("Chunk", ChunkSchema, "product-images.chunks");

const Schema = mongoose.Schema;
const sizesSubSchema = mongoose.Schema(
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
  { _id: false }
);

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
    category: {
      type: String,
      required: true,
    },
    sizes: [sizesSubSchema],
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// ProductSchema.set("toJSON", { virtuals: true });
// ProductSchema.set("toObject", { virtuals: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product, ProductSchema };
