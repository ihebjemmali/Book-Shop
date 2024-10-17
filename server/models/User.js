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

// Validate create account
function validateCreateAccount(obj) {
  const schema = Joi.object({
    username: Joi.string().required().min(4).max(22).trim(),
    email: Joi.string().required().email().min(10).max(100).trim(),
    password: Joi.string().required().min(10).trim(),
    profilePhoto: Joi.object().default({
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicId: null,
    }),
  });

  return schema.validate(obj);
}

module.exports = { User, validateCreateAccount };
