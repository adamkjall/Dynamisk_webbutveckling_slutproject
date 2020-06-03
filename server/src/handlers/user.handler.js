const { User } = require("../models/user.model");
const { ErrorHandler } = require("../helpers/error.helpers")

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
  User.findOne({ email: userData.email }, (error, queriedUser) => {
    try {
      if (error) next(error)
      if (!queriedUser) {
        User.create(userData, (error, user) => {
          if (error) {
            next(error)
          } else {
            // store authentication session
            req.session.userId = user._id;
            res.status(201).json({ message: "Authenticated" });
          }
        });
      }
      else {
        throw new ErrorHandler(400, "Email address is already in use")
      }
    } catch (error) {
      next(error)
    }
  });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    User.authenticate(email, password, (error, user) => {
      try {
        if (error) next(error)
        if (!user) throw new ErrorHandler(401, "Wrong email or password")
        // store authentication session
        req.session.userId = user._id;
        res.status(200).json({ message: "Authenticated" });
      } catch (error) {
        next(error)
      }
    });
  }
};

const logoutUser = (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy( (error) => {
      if (error) {
        return next(error);
      } else {
        return res.redirect("/");
      }
    });
  }
};

const getSessionUser = (req, res, next) => {
  User.findById(req.session.userId, (error, user) => {
    if (error) next(error)
    res.user = user;
    next();
  });
};

const getAllUsers = (req, res, next) => {
  User.find({}, (error, allUsers) => {
    if (error) next(error)
    res.allUsers = allUsers;
    next();
  });
};

const updateUser = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (error, updatedUser) => {
      if (error) next(error)
      res.updatedUser = updatedUser;
      next();
    }
  );
};

const deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (error, deletedResult) => {
    if (error) next(error)
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
