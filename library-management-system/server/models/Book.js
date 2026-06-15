const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,

  author: String,

  category: String,

  isbn: String,

  quantity: Number,

  availableCopies: Number
});

module.exports = mongoose.model("Book", bookSchema);