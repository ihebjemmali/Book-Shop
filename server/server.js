const express = require("express");

const userRouter = require("./routes/userRoutes.js");
const bookRouter = require("./routes/bookRoutes.js");
const cartRoutes = require("./routes/cartRoutes");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow sending cookies
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
// Connection to DB
const connect = require("./database/db.js");
require("./database/db.js"); // Connect to DB

// Initialize app
const app = express();
app.use(cors());

// Middlewares
app.use(express.json());

app.use(cors(corsOptions));
//localhost:5000/user/create
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/api", cartRoutes);

// Running the server
const PORT = 3004;

app.listen(PORT, (err) => {
  if (err) console.log(err);

  console.log(`Server running on port ${PORT}`);
});
