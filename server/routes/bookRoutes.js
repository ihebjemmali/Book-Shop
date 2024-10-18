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
router.get("/books", getAllBooks); // Get all books
router.get("/books/:id", getBookById); // Get a book by ID
router.post("/books", createBook); // Create a new book
router.put("/books/:id", updateBook); // Update a book by ID
router.delete("/books/:id", deleteBook); // Delete a book by ID

module.exports = router;
