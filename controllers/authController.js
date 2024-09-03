const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if an email and password exist
  if (!email || !password) {
    next(new AppError('Please provide email and password!', 400));
  }

  // check if a user exists and && password is correct
  const user = await User.findOne(email);

  // if everything ok, send the token to client
  const token = '';

  res.status(201).json({ status: 'success', token, data: { user } });
});
