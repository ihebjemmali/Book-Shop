const mongoose = require("mongoose");
var url = "mongodb://127.0.0.1:27017/myProject";
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

module.exports = mongoose;
