const authController = require('../controllers/authController.js');

const router = require('express').Router();

router.post('/signup', authController.new_User);

router.post('/signin', authController.signin_User);

module.exports = router;