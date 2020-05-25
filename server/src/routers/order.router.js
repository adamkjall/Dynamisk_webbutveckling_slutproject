const express = require('express')
const router = express.Router()
const Order = require('../models/order.model')

//GET ALL ORDERS
router.get('/', (req, res) => {
    res.status(200).json({ message: 'endpoint: Get all orders' })
})

//GET ALL ORDERS FOR A USER
router.get('/:userId', (req, res) => {
    res.status(200).json({ message: "endpoint: Get specific user's orders", params: req.params })
})

//GET ORDER BY ID
router.get('/:id', (req, res) => {
    res.status(200).json({ message: "endpoint: Get specific order", params: req.params })
})

//POST ORDER
router.post('/', (res, req) => {
    res.status(200).json({ message: "endpoint: Get specific order" })
})

//UPDATE ORDER
router.put('/:id', (req, res) => {
    res.status(200).json({ message: 'endpoint: Update specific order by id', params: req.params, body: req.body })
})

module.exports = router