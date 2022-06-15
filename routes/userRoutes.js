const userController = require('../controllers/userController.js');
const protectRoutes = require('../middlewares/protectRoutes');

const router = require('express').Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.searchUserById)
  .put(protectRoutes, userController.updateUser)
  .delete(protectRoutes, userController.deleteUser);

module.exports = router;
