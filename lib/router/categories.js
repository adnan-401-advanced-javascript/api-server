/* eslint-disable no-use-before-define , consistent-return */

const express = require("express");

const router = express.Router();

const Category = require("../models/categories/categories-model");

router.get("/", listCategories);
router.get("/:id", getCategoryById);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

/* categories */

async function listCategories(req, res) {
  const data = await Category.get();
  res.status(200).send({ count: data.length, result: data });
}

async function getCategoryById(req, res) {
  const data = await Category.get(req.params.id);
  if (data.length) {
    res.status(200).send(data);
  } else {
    res.status(404).send();
  }
}

async function addCategory(req, res) {
  const record = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  const data = await Category.create(record);
  res.status(200).send(data);
}

async function updateCategory(req, res) {
  const newRecord = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  const data = await Category.update(req.params.id, newRecord);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(404).send();
  }
}

async function deleteCategory(req, res) {
  const data = await Category.delete(req.params.id);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(404).send();
  }
}

module.exports = router;
