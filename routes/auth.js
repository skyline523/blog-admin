const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

router.get('/userInfo', authController.getUserInfo);

module.exports = router;
