const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please tell us your name.'] },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'Please provide your email.'],
      validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, 'Please provide a password.'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password.'],
    },
    photo: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
