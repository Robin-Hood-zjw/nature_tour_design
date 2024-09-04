const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if an email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // check if a user exists and && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  // if everything ok, send the token to client
  const token = signToken(user._id);

  res.status(201).json({ status: 'success', token });
});

exports.protect = catchAsync(async (req, res, next) => {
  // get the token to check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);
  // validate the token
  if (!token)
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );

  // check if the user exists

  // check if the password changed

  next();
});
