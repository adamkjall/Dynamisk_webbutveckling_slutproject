const mongoose = require('mongoose')
const userSchema = require('./user.model')
const productSchema = require('./product.model')
const shipmentSchema = require('./shipment.model')
const paymentSchema = require('./payment.model')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: userSchema,
    products: [productSchema],
    shippingMethod: shipmentSchema,
    paymentMethod: paymentSchema,
    toAddress: {
        type: String,
        required: true
    },
    toZipCode: {
        type: Number,
        required: true
    },
    toCity: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    },
    orderStatus:{
        type: Boolean,
        required: true
    }
})
const Order = mongoose.model('Order', orderSchema)

module.exports = Order