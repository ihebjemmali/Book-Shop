const axios = require("axios");
const mongoose = require("mongoose");
const Book = require("./models/book");
// Adjust the path as needed

// MongoDB connection
var url = "mongodb://127.0.0.1:27017/myProject";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB:", err);
  });

// Fetch books from an external API
async function fetchBooks() {
  try {
    const response = await axios.get(
      "https://api.itbook.store/1.0/search/mongodb"
    ); // Replace with your actual API
    const books = response.data.books;

    for (const book of books) {
      await saveBookToDB(book); // Save the book in MongoDB
    }

    const secondResponse = await axios.get(
      "https://api.itbook.store/1.0/search/react"
    ); // Replace with your actual API
    const secondBooks = secondResponse.data.books;

    for (const book of secondBooks) {
      await saveBookToDB(book); // Save the book in MongoDB
    }

    const thirdResponse = await axios.get(
      "https://api.itbook.store/1.0/search/node"
    ); // Replace with your actual API
    const thirdBooks = thirdResponse.data.books;

    for (const book of thirdBooks) {
      await saveBookToDB(book); // Save the book in MongoDB
    }

    const fourthResponse = await axios.get(
      "https://api.itbook.store/1.0/search/javascript"
    ); // Replace with your actual API
    const fourthBooks = fourthResponse.data.books;

    for (const book of fourthBooks) {
      await saveBookToDB(book); // Save the book in MongoDB
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Save the book in MongoDB
async function saveBookToDB(bookData) {
  const { title, isbn13, price, subtitle, url, image } = bookData;
  const book = new Book({
    title,
    isbn13,
    price,
    subtitle,
    url,
    image,
  });

  try {
    await book.save();
    console.log("Book saved to MongoDB:", book.title);
  } catch (error) {
    console.error("Error saving book to MongoDB:", error);
  }
}

// Run the script to fetch and save books
fetchBooks();
