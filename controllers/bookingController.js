const stripe = require('stripe');

const Tour = require('../models/tourModel');

const AppError = require('../utils/appError');

const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getCheckout = catchAsync(async (req, res, next) => {
    // get the currently booked tous
    const tour = await Tour.findById(req.params.tourId);
    // create checkout sessions
    // create sessions as response
});