const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
