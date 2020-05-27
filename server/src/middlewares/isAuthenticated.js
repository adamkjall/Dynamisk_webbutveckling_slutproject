module.exports = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};