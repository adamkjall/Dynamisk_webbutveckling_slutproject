const Order = require("../models/order.model");
const { ErrorHandler } = require("../helpers/error.helpers")

const getAllOrders = (req, res, next) => {
    Order.find({}, (error, allOrders) => {
        try {
            if (error) next(error)
            if (!allOrders || allOrders.length === 0) {
                throw new ErrorHandler(404, "Couldn't find any orders")
            }
            res.allOrders = allOrders;
            next();
        } catch (error) {
            next(error)
        }
    });
};

const getAllOrdersFromAUser = (req, res, next) => {
    Order.find({ 'user._id': req.params.id }, (error, allUserOrders) => {
        try {
            if (error) next(error)
            if (!allUserOrders || allUserOrders.length === 0) {
                throw new ErrorHandler(404, "Coundn't find user and/or orders")
            }
            res.allUserOrders = allUserOrders;
            next();
        } catch (error) {
            next(error)
        }
    });
};

const getOrder = (req, res, next) => {
    Order.findById(req.params.id, (error, order) => {
        try {
            if (error) next(error)
            if (!order) throw new ErrorHandler(404, "Couldn't find order")
            res.order = order;
            next();
        } catch (error) {
            next(error)
        }
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
            try {
                if (error) next(error)
                if (!newOrder) throw new ErrorHandler(400, "Couldn't create order")
                res.newOrder = newOrder;
                next();
            } catch (error) {
                next(error)
            }
        }
    )
};

module.exports = { getAllOrders, getAllOrdersFromAUser, getOrder, createOrder };
