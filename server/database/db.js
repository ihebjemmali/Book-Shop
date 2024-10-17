const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/user";

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

module.exports = mongoose;
