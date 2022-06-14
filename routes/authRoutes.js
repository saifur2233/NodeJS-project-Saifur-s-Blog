const authController = require('../controllers/authController.js');
const router = require('express').Router();

router.post('/signup', authController.signUp);

router.post('/signin', authController.signIn);

module.exports = router;
