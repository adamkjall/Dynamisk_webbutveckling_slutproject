const Order = require("../models/order.model");

const getAllOrders = (req, res, next) => {
    Order.find({}, (err, allOrders) => {
        if (err) res.status(500).json({ message: "Couldn't perform orders get" });
        res.allOrders = allOrders;
        next();
    });
};

const getAllOrdersFromAUser = (req, res, next) => {
    Order.find({ User: { _id: req.params.id } }, (err, allUserOrders) => {
        if (err)
            res.status(500).json({ message: "Coundn't get all orders for a user" });
        res.allUserOrders = allUserOrders;
        next();
    });
};

const getOrder = (req, res, next) => {
    Order.findById(req.params.id, (err, order) => {
        if (err) res.status(404).json({ message: "Coundn't find order" });
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
        (err, newOrder) => {
            if (err) res.status(500).json({ message: "Couldn't create order" });
            res.newOrder = newOrder;
            next();
        }
    )
};

module.exports = { getAllOrders, getAllOrdersFromAUser, getOrder, createOrder };
