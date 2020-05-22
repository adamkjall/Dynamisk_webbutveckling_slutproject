const mongoose = require('mongoose')

const Schema = mongoose.Schema
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sizes: [{
        size: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true
        }
    }],
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product