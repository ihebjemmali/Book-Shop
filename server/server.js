const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", bookRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
