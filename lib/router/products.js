/* eslint-disable no-use-before-define , consistent-return */

const express = require("express");

const router = express.Router();

const Product = require("../models/products/products-model");

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

/* products  */

async function listProducts(req, res) {
  const data = await Product.get();
  res.status(200).send({ count: data.length, result: data });
}

async function getProductById(req, res) {
  const data = await Product.get(req.params.id);
  if (data.length) {
    res.status(200).send(data);
  } else {
    res.status(404).send();
  }
}

async function addProduct(req, res) {
  const record = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
    category: req.body.category,
  };
  const data = await Product.create(record);
  res.status(200).send(data);
}

async function updateProduct(req, res) {
  const newRecord = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
    category: req.body.category,
  };
  const data = await Product.update(req.params.id, newRecord);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(404).send();
  }
}

async function deleteProduct(req, res) {
  const data = await Product.delete(req.params.id);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(404).send();
  }
}

module.exports = router;
