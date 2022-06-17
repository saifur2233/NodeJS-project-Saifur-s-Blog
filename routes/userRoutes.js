const userController = require('../controllers/userController.js');
const protectRoutesUser = require('../middlewares/protectRoutesUser');

const router = require('express').Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.searchUserById)
  .put(protectRoutesUser, userController.updateUser)
  .delete(protectRoutesUser, userController.deleteUser);

module.exports = router;
