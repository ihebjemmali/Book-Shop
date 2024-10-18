const mongoose = require("mongoose");
const Joi = require("joi");

// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 22,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 10,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  profilePhoto: {
    type: Object,
    default: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicId: null,
    },
  },
});

// User model
const User = mongoose.model("User", UserSchema);

module.exports = { User,  };
