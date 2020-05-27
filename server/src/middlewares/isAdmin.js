module.exports = (req, res, next) => {
    if (res.user && res.user.isAdmin) {
        next()
    } else if (!res.user) {
        console.log("Server: Make sure you run the 'getUser' handler before you check for admin privileges");
        res.status(403).json({ message: 'Unauthorized' })
    } else {
        res.status(403).json({ message: 'Unauthorized' })
    }
}