const express = require('express');

const tourControllers = require('../controllers/tourController');

const router = express.Router();

router.param('id', tourControllers.checkID);

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.checkBody, tourControllers.createTour);

router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;
