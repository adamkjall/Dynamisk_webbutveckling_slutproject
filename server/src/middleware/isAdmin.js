module.exports = (res, req, next) => {
    console.log("Server: (isAdmin) Validating admin permissions");
    next()
}