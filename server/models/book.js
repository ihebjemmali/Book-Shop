const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  imageURL: String,
  description: String,
  author: String,
  genre: String,
  pdfLink: String,
  publishedYear: Number,
  price: Number,
});

module.exports = mongoose.model("Book", bookSchema);
