const express = require('express')
const router = express.Router()
const Shipment = require('../models/shipment.model')
const isAuthenticated = require('../middleware/isAuthenticated')

//GET SHIPPING METHODS
router.get('/', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'endpoint: Get shipping methods' })
})

module.exports = router