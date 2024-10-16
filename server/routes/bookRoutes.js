const express = require("express");
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// Book routes
router.get("/book", getAllBooks);
router.post("/book", createBook);
router.put("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);

module.exports = router;
