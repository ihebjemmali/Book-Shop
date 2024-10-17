const mongoose = require("mongoose");
var url = "mongodb://127.0.0.1:27017/myProject";
mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = mongoose;
