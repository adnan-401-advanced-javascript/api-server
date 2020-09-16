/* eslint-disable no-use-before-define */
const express = require("express");

const router = express.Router();

const categories = require("../models/categories/categories-model");
const products = require("../models/products/products-model");

router.get("/:model", handleGetAllItems);
router.post("/:model", handleAllPost);
router.get("/:model/:id", getItemById);
router.put("/:model/:id", updateItem);
router.patch("/:model/:id", patchItem);
router.delete("/:model/:id", deleteItem);

router.param("model", getModel);

// How will we get the right Model?

function getModel(req, res, next) {
  const { model } = req.params;
  console.log(model);
  switch (model) {
    case "categories":
      req.model = categories;
      next();
      break;
    case "products":
      req.model = products;
      next();
      break;
    default:
      next(new Error("Invalid Model!!!"));
      break;
  }
}

function handleAllPost(req, res) {
  req.model.create(req.body).then((result) => {
    res.status(200).send(result);
  });
}

function handleGetAllItems(req, res) {
  req.model.get().then((results) => {
    const count = results.length;
    res.status(200).send({ count, results });
  });
}

function getItemById(req, res) {
  req.model.get(req.params.id).then((result) => {
    res.status(200).send(result);
  });
}

function updateItem(req, res) {
  req.model.update(req.params.id, req.body).then((result) => {
    res.status(200).send(result);
  });
}

function patchItem(req, res) {
  req.model.update(req.params.id, req.body).then((result) => {
    res.status(200).send(result);
  });
}

function deleteItem(req, res) {
  req.model.delete(req.params.id).then((result) => {
    res.status(200).send(result);
  });
}

module.exports = router;
