const { User } = require("../models/user.model");

const register = (req, res, next) => {
  // or perhaps send user as a named object eg req.body.user
  const userData = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    streetAddress: req.body.streetAddress,
    zipCode: req.body.zipCode,
    city: req.body.city,
    isAdmin: req.body.isAdmin,
  };

  User.findOne({ email: userData.email }, (err, queriedUser) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    if (!queriedUser) {
      User.create(userData, (err, user) => {
        if (err) {
          res.status(400).json(err);
        } else {
          // store authentication session
          req.session.userId = user._id;
          res.status(201).json({ status: "Authenticated" });
        }
      });
    } else {
      res.status(401).json({ status: "Email address is already in use" });
    }
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    User.authenticate(email, password, (err, user) => {
      if (err) {
        res.status(401).json({ status: "Wrong name" });
      } else if (user) {
        // store authentication session
        req.session.userId = user._id;
        res.status(200).json({ status: "Authenticated" });
      } else {
        res.status(401).json({ status: "Wrong password" });
      }
    });
  }
};

const logout = (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
};

module.exports = { register, login, logout };
