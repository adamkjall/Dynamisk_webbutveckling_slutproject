const mongoose = require("mongoose");

const { userSchema } = require("./user.model.js");
const { productSchema } = require("./product.model.js");
const { shipmentSchema } = require("./shipment.model.js");
const { paymentSchema } = require("./payment.model.js");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: userSchema,
    required: true,
  },
  products: { type: [productSchema], required: true },
  shippingMethod: { type: shipmentSchema, required: true },

  paymentMethod: { type: paymentSchema, required: true },
  toAddress: {
    type: String,
    required: true,
  },
  toZipCode: {
    type: Number,
    required: true,
  },
  toCity: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  orderStatus: {
    type: Boolean,
    required: true,
  },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
