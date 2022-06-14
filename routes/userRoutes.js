const userController = require('../controllers/userController.js');
const checkLogin = require('../middlewares/checkLogin');

const router = require('express').Router();

router
  .route('/')
  .get(userController.getAllUsers)

router
  .route('/:id')
  .get(userController.searchUserById)
  .put(checkLogin, userController.updateUser)
  .delete(checkLogin, userController.deleteUser)

module.exports = router;
