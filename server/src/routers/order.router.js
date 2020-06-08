/* EXPRESS SETUP */
const express = require("express");
const router = express.Router();

/* MIDDLEWARES */
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");

/* HANDLERS */
const { getSessionUser } = require("../handlers/user.handler");
const {
  getAllOrders,
  getAllOrdersFromAUser,
  getOrder,
  createOrder,
} = require("../handlers/order.handler");
const { checkProductStock } = require("../handlers/product.handler");

/* ENDPOINTS */

//GET ALL ORDERS
router.get(
  "/",
  isAuthenticated,
  getSessionUser,
  isAdmin,
  getAllOrders,
  (req, res) => {
    res.status(200).json(res.allOrders);
  }
);

//GET ALL ORDERS FOR A USER
router.get(
  "/user/:id",
  isAuthenticated,
  getSessionUser,
  isAdmin,
  getAllOrdersFromAUser,
  (req, res) => {
    res.status(200).json(res.allUserOrders);
  }
);

//GET ORDER BY ID
router.get(
  "/:id",
  isAuthenticated,
  getSessionUser,
  isAdmin,
  getOrder,
  (req, res) => {
    res.status(200).json(res.order);
  }
);

//POST ORDER
router.post(
  "/",
  isAuthenticated,
  checkProductStock,
  createOrder,
  (req, res, error) => {
    res.status(200).json(res.newOrder);
  }
);

//UPDATE ORDER
router.put("/:id", isAuthenticated, (req, res) => {
  res.status(200).json({
    message: "endpoint: Update specific order by id",
    devInfo: "Will this get used?",
    params: req.params,
    body: req.body,
  });
});

module.exports = router;
