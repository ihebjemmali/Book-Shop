
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST route to create a new user
const createNewUser = async (req, res) => {
  const { data } = req.body;
  const user = new User(data);
  const salt = bcrypt.genSaltSync(10);
  const cryptedPassword = await bcrypt.hashSync(data.password, salt);
  user.password = cryptedPassword;

  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.send(err);
  }
};

// POST route to log in a user
const    loginUser = async (req, res) => {
  const { data } = req.body;
  const user = await User.findOne({ email: data.email });

  if (!user) {
    return res.status(404).send("Email or password is incorrect");
  }

  const validPassword = await bcrypt.compareSync(data.password, user.password);
  if (!validPassword) {
    return res.status(404).send("Email or password is incorrect");
  }

  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };

  const token = jwt.sign(payload, "123457");
  res.status(200).send({ myToken: token });
};

// GET route to retrieve all users
router.get("/getall", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

module.exports = { createNewUser, loginUser };

