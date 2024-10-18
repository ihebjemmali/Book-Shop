const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  isbn13: {
    type: String,
  },
  price: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  url: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Book", bookSchema);
