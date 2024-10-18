const express = require("express");
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
} = require("../controllers/bookController");

const router = express.Router();

// Book routes

router.get("/books", getAllBooks); // Use "/books" here
router.post("/books", createBook); // Use "/books" here
router.put("/books/:id", updateBook); // Update a book
router.delete("/books/:id", deleteBook); // Delete a book
router.get("/books/:id", getBookById);

module.exports = router;
