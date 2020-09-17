/* eslint-disable-next-line */
module.exports = (err, req, res, next) => {
  res.status(500).send({ err });
};
