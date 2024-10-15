const express = require("express");
const userRouter = require("./routes/user");
// Connection to DB
const connect = require("./connectToDb");

// Init app
const app = express();

// Middlewares
app.use(express.json());
//localhost:5000/user/create
http: app.use("/user", userRouter);

// Running the server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
