const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST route
router.post("/create", async (req, res) => {
  data = req.body;
  const usr = new User(data);
  salt = bcrypt.genSaltSync(10);
  cryptedPass = await bcrypt.hashSync(data.password, salt);
  usr.password = cryptedPass;
  usr
    .save()
    .then((saved) => {
      res.send(saved).status(200);
    })
    .catch((err) => {
      res.send(err);
    });
});
//login
router.post("/login", async (req, res) => {
  data = req.body;
  user = await User.findOne({ emai: data.email });
  if (!user) {
    res.status(404).send("email or passowrd not correct");
  } else {
    validPass = bcryptt.compareSync(data.password, user.password);
    if (!validPass) {
      res.status(404).send("email or passowrd not correct");
    } else {
    }
  }
});

// GET route
router.get("/getall", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
