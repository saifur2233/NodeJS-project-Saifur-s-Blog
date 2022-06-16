const userController = require('../controllers/userController.js');
const protectRoutes = require('../middlewares/protectRoutes.js').protectRoutes;

const router = require('express').Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.searchUserById)
  .put(protectRoutes('myuser'), userController.updateUser)
  .delete(protectRoutes('myuser'), userController.deleteUser);

module.exports = router;
