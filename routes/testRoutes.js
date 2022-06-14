const testController = require('../controllers/testController')

const router = require('express').Router()

router.post('/test', testController.login)

module.exports = router
