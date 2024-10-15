const express = require("express");
const { getAllBooks, createBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/books", getAllBooks);
router.post("/books", createBook);
router.post("/books", createBook);

module.exports = router;
