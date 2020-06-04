const { User } = require("../models/user.model");
const { ErrorHandler } = require("../helpers/error.helpers")

const registerUser = (req, res, next) => {
  // TODO validate user
  const userToRegister = req.body.user;
  User.findOne({ email: userToRegister.email }, (error, queriedUser) => {
    try {
      if (error) next(error)
      if (!queriedUser) {
        User.create(userToRegister, (error, user) => {
          try {
            if (error) next(error)
            if (!user) throw new ErrorHandler(400, "Couldn't create new user")
            // store authentication session
            req.session.userId = user._id;
            res.user = user
            next()
          } catch (error) {
            next(error)
          }
        });
      } else {
        throw new ErrorHandler(401, "Email address is already in use")
      }
    } catch (error){
      next(error)
    }
  });
};

const loginUser = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      User.authenticate(email, password, (error, user) => {
        try {
          if (error) next(error)
          if (!user) throw new ErrorHandler(401, "Wrong email or password")
          // store authentication session
          req.session.userId = user._id;
          next()
        } catch (error) {
          next(error)
        }
      });
    } else {
      throw new ErrorHandler(401, "No email and/or password submitted")
    }
  } catch (error) {
    next(error)
  }
};

const logoutUser = (req, res, next) => {
  try {
    if (req.session) {
      // delete session object
      req.session.destroy( (error) => {
        if (error) next(error);
        res.redirect("/");
        next();
      });
    } else {
      throw new ErrorHandler(404, "No ongoing session")
    }
  } catch (error) {
    next(error)
  }
};

const getSessionUser = (req, res, next) => {
  User.findById(req.session.userId, (error, user) => {
    try {
      if (error) next(error)
      if (!user) throw new ErrorHandler(404, "Couldn't find user")
      res.user = user;
      next();
    } catch(error) {
      next(error)
    }
  });
};

const getAllUsers = (req, res, next) => {
  User.find({}, (error, allUsers) => {
    try {
      if (error) next(error)
      if (!allUsers) throw new ErrorHandler(404, "Found no users")
      res.allUsers = allUsers;
      next();
    } catch(error) {
      next(error)
    }
  });
};

const updateUser = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (error, updatedUser) => {
      try {
        if (error) next(error)
        if (!updatedUser) throw new ErrorHandler(400, "Couldn't perform user update")
        res.updatedUser = updatedUser;
        next();
      } catch (error) {
        next(error)
      }
    }
  );
};

const deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (error, deletedResult) => {
    try {
      if (error) next(error)
      if (!deletedResult) throw new ErrorHandler(500, "Couldn't perform user deletion")
      res.deletedResult = deletedResult;
      next();
    } catch(error) {
      next(error)
    }
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
