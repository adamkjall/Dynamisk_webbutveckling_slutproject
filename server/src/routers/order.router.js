const express = require('express')
const router = express.Router()
const Order = require('../models/order.model')
const isAuthenticated = require('../middleware/isAuthenticated')
const isAdmin = require('../middleware/isAdmin')
const isValidUser = require('../middleware/isValidUser')

//GET ALL ORDERS
router.get('/', isAuthenticated, isAdmin, (req, res) => {
    res.status(200).json({ message: 'endpoint: Get all orders' })
})

//GET ALL ORDERS FOR A USER
router.get('/user/:id', isAuthenticated, isValidUser, (req, res) => {
    res.status(200).json({ message: "endpoint: Get specific user's orders", params: req.params })
})

//GET ORDER BY ID
router.get('/:id', isAuthenticated, isValidUser, (req, res) => {
    res.status(200).json({ message: "endpoint: Get specific order", params: req.params })
})

//POST ORDER
router.post('/', isAuthenticated, (req, res) => {
    res.status(200).json({ message: "endpoint: Get specific order", body: req.body })
})

//UPDATE ORDER
router.put('/:id', isAuthenticated, isAdmin, (req, res) => {
    res.status(200).json({ message: 'endpoint: Update specific order by id', params: req.params, body: req.body })
})

module.exports = router