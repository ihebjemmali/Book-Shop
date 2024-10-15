const User = require("../models/users");
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, address, password } = req.body;
    const newUser = new User({ firstName, lastName, address, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

module.exports = {
  createUser,
  getUsers,
};
