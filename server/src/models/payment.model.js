const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment