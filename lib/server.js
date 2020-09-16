/* eslint-disable no-use-before-define , consistent-return */
const express = require("express");
const middleWare404 = require("./middleware/404");
const middleWare500 = require("./middleware/500");
const logger = require("./middleware/logger");
const timeStamp = require("./middleware/timestamp");

const categoriesRouter = require("./router/categories");
const productsRouter = require("./router/categories");

const app = express();

app.use(express.json());
app.use(timeStamp);
app.use(logger);

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
