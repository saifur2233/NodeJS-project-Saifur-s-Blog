const userController = require('../controllers/userController.js')
const checkLogin = require('../middlewares/checkLogin')

const router = require('express').Router()

router.get('/', userController.getAllUsers)

router.put('/:id', checkLogin, userController.updateUser)

router.delete('/:id', checkLogin, userController.deleteUser)

module.exports = router
