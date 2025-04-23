const Tour = require('../models/tourModel');
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

  res
    .status(200)
    .set('Content-Security-Policy',policy)
    .render('tour', { title: `${tour.name}`, tour });
});

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   "connect-src 'self' https://cdnjs.cloudflare.com",
    // )
    .render('login', {
      title: 'User Login',
    });
};
