const authController = require('../controllers/authController.js');
const router = require('express').Router();

router.post('/signup', authController.signUp);

router.post('/signin', authController.signIn);

router.get('/verifyuser', authController.verifyUser);

router.post('/signout', authController.signout);

module.exports = router;
