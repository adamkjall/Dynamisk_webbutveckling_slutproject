const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../handlers/user.handler");

//GET ALL USERS
router.get("/", (req, res) => {
  res.status(200).json({ message: "endpoint: Get all users" });
});

//GET ONE USER
router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ message: "endpoint: Get specfic user by id", params: req.params });
});

//UPDATE USER
router.put("/:id", (req, res) => {
  res.status(200).json({
    message: "endpoint: Update specific user by id",
    params: req.params,
    body: req.body,
  });
});

//DELETE USER
router.delete("/:id", (req, res) => {
  res.status(200).json({
    message: "endpoint: Delete specific user by id",
    params: req.params,
  });
});

//REGISTER USER
router.post("/", register, (req, res) => {
  res.status(200).json({ message: "endpoint: Register user", body: req.body });
});

// USER SESSION ENDPOINTS

//LOGIN USER
router.post("/session/login", login, (req, res) => {
  res.status(200).json({ message: "endpoint: login user", body: req.body });
});

// LOGOUT USER
router.delete("/session/logout", logout, (req, res) => {
  res.status(200).json({ message: "endpoint: logout user" });
});

module.exports = router;
