/* eslint-disable no-use-before-define , consistent-return */
const express = require("express");
const middleWare404 = require("./middleware/404");
const middleWare500 = require("./middleware/500");
const logger = require("./middleware/logger");
const timeStamp = require("./middleware/timestamp");

const app = express();

app.use(express.json());
app.use(timeStamp);
app.use(logger);

const productsArray = [];
const categoriesArray = [];

app.get("/categories", listCategories);
app.get("/categories/:id", getCategoryById);
app.post("/categories", addCategory);
app.put("/categories/:id", updateCategory);
app.patch("/categories/:id", patchCategory);
app.delete("/categories/:id", deleteCategory);

app.get("/products", listProducts);
app.get("/products/:id", getProductById);
app.post("/products", addProduct);
app.put("/products/:id", updateProduct);
app.patch("/products/:id", patchProduct);
app.delete("/products/:id", deleteProduct);

/* categories */

function listCategories(req, res) {
  res.status(200).send({ count: categoriesArray.length, result: categoriesArray });
}

function getCategoryById(req, res) {
  categoriesArray.forEach((item) => {
    if (`${item.id}` === req.params.id) {
      return res.status(200).send(item);
    }
  });
  res.status(404).send();
}

function addCategory(req, res) {
  const record = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
    category: req.body.category,
  };
  record.id = `${categoriesArray.length + 1}`; // id starts from 1
  categoriesArray.push(record);
  res.status(200).send(record);
}

function updateCategory(req, res) {
  categoriesArray.forEach((val, index) => {
    if (`${val.id}` === req.params.id) {
      const newRecord = {
        id: req.params.id,
        name: req.body.name,
        display_name: req.body.display_name,
        description: req.body.description,
        category: req.body.category,
      };
      categoriesArray.splice(index, 1, newRecord);
      return res.status(200).send(newRecord);
    }
  });
  res.status(404).send();
}

function patchCategory(req, res) {
  categoriesArray.forEach((val, index) => {
    if (`${val.id}` === req.params.id) {
      const newRecord = {
        name: req.body.name ? req.body.name : val.name,
        display_name: req.body.display_name ? req.body.display_name : val.display_name,
        description: req.body.description ? req.body.description : val.description,
        category: req.body.category ? req.body.category : val.category,
        id: req.params.id,
      };
      categoriesArray.splice(index, 1, newRecord);
      return res.status(200).send(newRecord);
    }
  });
  return res.status(404).send();
}

function deleteCategory(req, res) {
  categoriesArray.forEach((val, index) => {
    if (`${val.id}` === req.params.id) {
      const deleted = val;
      categoriesArray.splice(index, 1);
      return res.status(200).send(deleted);
    }
  });
  return res.status(404).send();
}

/* products  */

function listProducts(req, res) {
  res.status(200).send({ count: productsArray.length, result: productsArray });
}

function getProductById(req, res) {
  productsArray.forEach((item) => {
    if (`${item.id}` === req.params.id) {
      const product = item;
      return res.status(200).send(product);
    }
  });
  return res.status(404).send();
}

function addProduct(req, res) {
  const product = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
    category: req.body.category,
  };
  product.id = `${productsArray.length + 1}`;
  productsArray.push(product);
  res.status(200).send(product);
}

function updateProduct(req, res) {
  productsArray.forEach((val, index) => {
    if (`${val.id}` === req.params.id) {
      const newRecord = {
        id: req.params.id,
        name: req.body.name,
        display_name: req.body.display_name,
        description: req.body.description,
        category: req.body.category,
      };
      productsArray.splice(index, 1, newRecord);
      return res.status(200).send(newRecord);
    }
  });
  return res.status(404).send();
}

function patchProduct(req, res) {
  productsArray.forEach((val, index) => {
    if (`${val.id}` === req.params.id) {
      const newRecord = {
        id: req.params.id,
        name: req.body.name ? req.body.name : val.name,
        display_name: req.body.display_name ? req.body.display_name : val.display_name,
        description: req.body.description ? req.body.description : val.description,
        category: req.body.category ? req.body.category : val.category,
      };
      productsArray.splice(index, 1, newRecord);
      return res.status(200).send(newRecord);
    }
  });
  return res.status(404).send();
}

function deleteProduct(req, res) {
  productsArray.forEach((val, index) => {
    if (`${val.id}` === req.params.id) {
      const deleted = val;
      productsArray.splice(index, 1);
      return res.status(200).send(deleted);
    }
  });
  return res.status(404).send();
}

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
