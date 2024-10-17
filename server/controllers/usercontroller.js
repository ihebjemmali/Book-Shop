const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Validation schema
const validateRegistration = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(22).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
      }),
  });
  return schema.validate(data);
};

const createNewUser = async (req, res) => {
  try {
    const { error } = validateRegistration(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already in use");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password");
    }

    const payload = { _id: user._id, email: user.email };
    const token = jwt.sign(payload, "your_secret_key");

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports = { createNewUser, loginUser };
