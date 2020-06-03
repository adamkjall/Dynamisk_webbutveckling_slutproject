const Order = require("../models/order.model");

const getAllOrders = (req, res, next) => {
    Order.find({}, (error, allOrders) => {
        if (error) next(error)
        res.allOrders = allOrders;
        next();
    });
};

const getAllOrdersFromAUser = (req, res, next) => {
    Order.find({ 'user._id': req.params.id }, (error, allUserOrders) => {
        if (error) next(error)
        res.allUserOrders = allUserOrders;
        next();
    });
};

const getOrder = (req, res, next) => {
    Order.findById(req.params.id, (error, order) => {
        if (error) next(error)
        res.order = order;
        next();
    });
};

const createOrder = (req, res, next) => {
    const orderData = {
        ...req.body,
        orderStatus: false
    };

    Order.create(
        orderData,
        (error, newOrder) => {
            if (error) next(error)
            res.newOrder = newOrder;
            next();
        }
    )
};

module.exports = { getAllOrders, getAllOrdersFromAUser, getOrder, createOrder };
