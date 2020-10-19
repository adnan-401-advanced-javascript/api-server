const mongoose = require("mongoose");

const items = mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, required: true },
  difficulty: { type: String, required: true },
  assignee: { type: String, required: true },
});

module.exports = mongoose.model("items", items); // collection name - its schema
