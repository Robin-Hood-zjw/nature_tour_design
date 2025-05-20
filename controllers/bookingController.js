const Stripe = require('stripe');

const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');

const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getCheckout = catchAsync(async (req, res, next) => {
    // get the currently booked tous
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const tour = await Tour.findById(req.params.tourId);

    // create checkout sessions
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
            {
                quantity: 1,
                price_data: {
                currency: 'inr',
                unit_amount: tour.price,
                product_data: {
                    name: `${tour.name} Tour`,
                    description: tour.summary,
                    images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                },
                },
            },
        ],
    });

    // create sessions as response
    res.status(200).json({ status: 'success', session });
});