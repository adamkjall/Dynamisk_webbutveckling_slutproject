const { User } = require("../models/user.model");

const registerUser = (req, res, next) => {
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
          res.status(201).json({ message: "Authenticated" });
        }
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
        res.status(200).json({ message: "Authenticated" });
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
      } else {
        return res.redirect("/");
      }
    });
  }
};

const getUser = (req, res, next) => {
  console.log("hellooooo", req.session);
  
  User.findById(req.session.userId, (err, user) => {
    if(err) res.status(404).json({ message: "Couldn't find user" })
    console.log("user", user);
    
    res.user = user
    next()
  })
};

const getAllUsers = () => {

};

const updateUser = () => {
  
};

const deleteUser = () => {

};

module.exports = { registerUser, loginUser, logoutUser, getUser };
