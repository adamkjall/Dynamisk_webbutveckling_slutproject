/* EXPRESS SETUP */
const express = require("express");
const router = express.Router();

/* MODELS */

/* MIDDLEWARES */
const isAuthenticated = require("../middlewares/isAuthenticated");

/* HANDLERS */
const { registerUser, loginUser, logoutUser, getUser } = require("../handlers/user.handler");

/* ENDPOINTS */

//GET ALL USERS
router.get("/all", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "endpoint: Get all users" });
});

//GET SESSION USER  
router.get("/", isAuthenticated, getUser, (req, res) => {
  res.status(200).json(res.user);
});

//UPDATE USER
router.put("/:id", isAuthenticated, (req, res) => {
  res.status(200).json({
    message: "endpoint: Update specific user by id",
    params: req.params,
    body: req.body,
  });
});

//DELETE USER
router.delete("/delete/:id", isAuthenticated, (req, res) => {
  res.status(200).json({
    message: "endpoint: Delete specific user by id",
    params: req.params,
  });
});

//REGISTER USER
router.post("/", registerUser, (req, res) => {
  res.status(200).json({ message: "endpoint: Register user", body: req.body });
});

// USER SESSION ENDPOINTS

//LOGIN USER
router.post("/login", loginUser, (req, res) => {
  res.status(200).json({ message: "endpoint: login user", body: req.body });
});

// LOGOUT USER
router.delete("/logout", isAuthenticated, logoutUser, (req, res) => {
  res.status(200).json({ message: "endpoint: logout user" });
});

module.exports = router;
