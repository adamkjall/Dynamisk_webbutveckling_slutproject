const mongoose = require("mongoose");

const { ProductSchema } = require("./product.model.js");
const { ShipmentSchema } = require("./shipment.model.js");
const { PaymentSchema } = require("./payment.model.js");

const Schema = mongoose.Schema;
const userSubSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  }
})

const OrderSchema = new Schema({
  user: {
    type: userSubSchema,
    required: true,
  },
  products: { type: [ProductSchema], required: true },
  shippingMethod: { type: ShipmentSchema, required: true },
  paymentMethod: { type: PaymentSchema, required: true },
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
    default: Date.now
  },
  orderStatus: {
    type: Boolean,
    required: true,
  },
});
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
