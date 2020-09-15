module.exports = (req, res) => {
  res.status(404).send({ err: "404, page not found!" });
};
