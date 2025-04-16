const express = require('express');
const authController = require('../controllers/authController');

const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', authController.protect, viewsController.getTour);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
