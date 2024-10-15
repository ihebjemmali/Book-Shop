const express = require("express");
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// Book routes
router.get("/", getAllBooks);
router.post("/", createBook);
router.put("/:id", updateBook); // Update a book
router.delete("/:id", deleteBook); // Delete a book

module.exports = router;
