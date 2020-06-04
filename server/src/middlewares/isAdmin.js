const { ErrorHandler } = require("../helpers/error.helpers")

module.exports = (req, res, next) => {
    try {
        if (res.user && res.user.isAdmin) {
            next()
        } else if (!res.user) {
            console.log("Server: Make sure you run the 'getUser' handler before you check for admin privileges");
            throw new ErrorHandler(500, "Internal server error")
        } else {
            throw new ErrorHandler(401, "User is unauthorized")
        }
    } catch (error) {
        next(error)
    }
}