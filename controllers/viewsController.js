const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

const policy = "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;";

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  res
    .status(200)
    .set('Content-Security-Policy',policy)
    .render('overview', { title: 'All tours', tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'reviews rating user',
  });

  if (!tour) return next(new AppError('There is no tour with that name.', 404));

  res
    .status(200)
    .set('Content-Security-Policy',policy)
    .render('tour', { title: `${tour.name}`, tour });
});

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    .render('login', {
      title: 'User Login',
    });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', { title: 'Your account' });
};


exports.updateUserData = catchAsync(async (req, res, next) => {
  // console.log('UPDATE BODY', req.body);
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name: req.body.name, email: req.body.email},
    { new: true, runValidators: true }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});