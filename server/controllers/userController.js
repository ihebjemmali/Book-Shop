const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { log } = require("console");

// POST route to create a new user
const createNewUser = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const user = new User(data);
    const salt = bcrypt.genSaltSync(10);
    const cryptedPassword = await bcrypt.hashSync(data.password, salt);
    user.password = cryptedPassword;
    user.save();

    res.status(200).send(user);
  } catch (err) {
    res.send(err);
  }
};

// POST route to log in a user
const loginUser = async (req, res) => {
  const data = req.body;
  console.log(req.body);

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

module.exports = { createNewUser, loginUser };
