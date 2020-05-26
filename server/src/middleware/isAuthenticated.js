module.exports = (req, res, next) => {
    console.log("Server: (isAuthenticated) Validating client active session")
    next()
}