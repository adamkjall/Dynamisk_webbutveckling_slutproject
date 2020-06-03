/* EXPRESS SETUP */
const express = require("express");
const router = express.Router();

/* MODELS */

/* MIDDLEWARES */
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");

/* HANDLERS */
const {
  registerUser,
  loginUser,
  logoutUser,
  getSessionUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../handlers/user.handler");

/* ENDPOINTS */

//GET ALL USERS
router.get(
  "/all",
  isAuthenticated,
  getSessionUser,
  isAdmin,
  getAllUsers,
  (req, res) => {
    res.status(200).json(res.allUsers);
  }
);

//GET SESSION USER
router.get("/", isAuthenticated, getSessionUser, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: res.user });
});

//UPDATE USER
router.put(
  "/:id",
  isAuthenticated,
  getSessionUser,
  isAdmin,
  updateUser,
  (req, res) => {
    res.status(200).json(res.updatedUser);
  }
);

//DELETE USER
router.delete(
  "/:id",
  isAuthenticated,
  getSessionUser,
  isAdmin,
  deleteUser,
  (req, res) => {
    res.status(200).json(res.deletedResult);
  }
);

//REGISTER USER
router.post("/", registerUser, (req, res) => {
  // res.status(200).json({ message: "endpoint: Register user", body: req.body });
});

// USER SESSION ENDPOINTS

//LOGIN USER
router.post("/session/login", loginUser);

// LOGOUT USER
router.delete(
  "/session/logout",
  isAuthenticated,
  logoutUser,
  (req, res, error) => {
    res.status(200);
  }
);

module.exports = router;
