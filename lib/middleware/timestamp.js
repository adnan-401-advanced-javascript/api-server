module.exports = (req, res, next) => {
  req.requestTime = `${(Date().toLocaleString())}`;
  next();
};
