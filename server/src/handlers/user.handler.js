const { User } = require("../models/user.model");

const registerUser = (req, res, next) => {
  // TODO validate user
  const userToRegister = req.body.user;

  User.findOne({ email: userToRegister.email }, (err, queriedUser) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    if (!queriedUser) {
      User.create(userToRegister, (err, user) => {
        if (err) {
          res.status(400).json(err);
          return;
        }

        // store authentication session
        req.session.userId = user._id;
        res.status(201).json({ message: "Authenticated", user });
      });
    } else {
      res.status(401).json({ message: "Email address is already in use" });
    }
  });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    User.authenticate(email, password, (err, user) => {
      if (err) {
        res.status(401).json({ message: "Wrong name" });
      } else if (user) {
        // store authentication session
        req.session.userId = user._id;
        res.status(200).json({ message: "Authenticated", user });
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    });
  }
};

const logoutUser = (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      }
      next();
    });
  }
};

const getSessionUser = (req, res, next) => {
  User.findById(req.session.userId, (err, user) => {
    if (err) res.status(404).json({ message: "Couldn't find user" });
    res.user = user;
    next();
  });
};

const getAllUsers = (req, res, next) => {
  User.find({}, (err, allUsers) => {
    if (err) res.status(500).json({ message: "Couldn't perform user get" });
    res.allUsers = allUsers;
    next();
  });
};

const updateUser = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(500).json({ message: "Couldn't perform user update" });
      }
      res.updatedUser = updatedUser;
      next();
    }
  );
};

const deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err, deletedResult) => {
    if (err)
      res.status(500).json({ message: "Couldn't perform user deletion" });
    res.deletedResult = deletedResult;
    next();
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getSessionUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
