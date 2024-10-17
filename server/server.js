const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes.js");
const bookRouter = require("./routes/bookRoutes.js");
require("./database/db.js"); // Connect to DB

// Initialize app
const app = express();
app.use(cors());

// Middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/book", bookRouter);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
