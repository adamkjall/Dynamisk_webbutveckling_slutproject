const express = require('express')
const router = express.Router()
const Payment = require('../models/payment.model')
const isAuthenticated = require('../middleware/isAuthenticated')

//GET PAYMENT METHODS
router.get('/', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'endpoint: Get payment methods' })
})

module.exports = router