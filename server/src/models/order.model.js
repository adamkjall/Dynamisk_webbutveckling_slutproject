const mongoose = require("mongoose");

const { UserSchema } = require("./user.model.js");
const { ProductSchema } = require("./product.model.js");
const { ShipmentSchema } = require("./shipment.model.js");
const { PaymentSchema } = require("./payment.model.js");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: UserSchema,
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
  },
  orderStatus: {
    type: Boolean,
    required: true,
  },
});
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
