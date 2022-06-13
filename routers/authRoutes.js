const authController = require('../controllers/authController.js')

const router = require('express').Router()

router.post('/signup', authController.userSignUp)

router.post('/signin', authController.userSignIn)

module.exports = router
