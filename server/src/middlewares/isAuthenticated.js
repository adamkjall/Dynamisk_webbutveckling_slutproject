const { ErrorHandler } = require("../helpers/error.helpers")

module.exports = (req, res, next) => {
  try {
    if (req.session && req.session.userId) {
      next();
    } else {
      throw new ErrorHandler(403, "User is not logged in")
    }
  } catch (error) {
    next(error)
  }
};