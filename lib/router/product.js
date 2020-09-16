/* eslint-disable no-use-before-define , consistent-return */

const express = require("express");

const router = express();

const Product = require("../models/categories/categories-model");

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

/* products  */

async function listProducts(req, res) {
  const data = await Product.get({ category: req.query.category }) || [];
  res.status(200).send({ count: data.length, result: data });
}

async function getProductById(req, res) {
  const data = await Product.get({ _id: req.params.id });
  if (data) {
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

async function updateProduct(req, res, next) {
  try {
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
  } catch (e) {
    next(e);
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
