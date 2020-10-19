/* eslint-disable no-use-before-define , consistent-return */
const express = require("express");
const middleWare404 = require("./middleware/404");
const middleWare500 = require("./middleware/500");
const logger = require("./middleware/logger");
const timeStamp = require("./middleware/timestamp");

const apiV1Router = require("./router/v1.js");
const categoriesRouter = require("./router/categories");
const productsRouter = require("./router/products");

const app = express();

app.use(express.json());
app.use(timeStamp);
app.use(logger);

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, PUT, PATCH, POST, DELETE",
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World!" });
});

app.use("/api/v1", apiV1Router);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

app.get("/serverError", (req, res, next) => {
  next(new Error("server errror"));
});

app.use("*", middleWare404);
app.use(middleWare500);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening ${PORT}`));
  },
};
