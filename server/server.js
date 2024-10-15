const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes"); // Add the book routes

const app = express();
app.use(express.json());
app.use(cors());

const url = "mongodb://127.0.0.1:27017/bookstore"; // Use a meaningful database name

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define the base URL for each set of routes
app.use("/api/users", userRoutes); // Users routes under /api/users
app.use("/api/books", bookRoutes); // Books routes under /api/books

app.listen(3000, () => console.log("Server running on port 3000"));
