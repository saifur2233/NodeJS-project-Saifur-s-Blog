const userController = require('../controllers/userController.js')
const checkLogin = require('../middlewares/checkLogin')

const router = require('express').Router()

router.get('/', userController.get_AllUsers)

router.put('/:id', checkLogin, userController.update_User)

router.delete('/:id', checkLogin, userController.delete_User)

module.exports = router
