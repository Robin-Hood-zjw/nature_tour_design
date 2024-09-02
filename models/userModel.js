const bcrypt = require('bcryptjs');
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
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same.',
      },
    },
    photo: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
