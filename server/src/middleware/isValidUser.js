module.exports = (req, res, next) => {
    console.log("Server: (isValidUser) Checking if user can perform request")
    next()
}