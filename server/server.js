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

<<<<<<< HEAD
// Running the server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======

app.use("/api", userRoutes);
app.use("/api", bookRoutes);


app.listen(3000, () => console.log("Server running on port 3000"));
>>>>>>> 602775740552060a30bac957c34c2a79b944895f
