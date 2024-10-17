const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes.js");
require("./database/db.js"); // Connect to DB

// Init app
const app = express();
app.use(cors());

// Middlewares
app.use(express.json());
app.use("/user", userRouter);

// Running the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
