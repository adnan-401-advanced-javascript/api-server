const mongoose = require("mongoose");

const items = mongoose.Schema({
  text: { type: String, required: true },
  complete: { type: Boolean, required: true, default: false },
  difficulty: { type: String, required: true, default: 0 },
  assignee: { type: String, required: false },
});

module.exports = mongoose.model("items", items); // collection name - its schema
