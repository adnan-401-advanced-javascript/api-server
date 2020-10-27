const mongoose = require("mongoose");

const products = mongoose.Schema({
  name: { type: String, required: true },
  display_name: { type: String, required: true },
  description: { type: String, required: true },
  inventoryCount: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("products", products); // collection name - its schema
