const userController = require('../controllers/userController.js');

const router = require('express').Router();

router.post('/', userController.create_User);

router.get('/', userController.get_AllUsers);

//router.get('/:id', userController.getOneUser);

router.put('/:id', userController.update_User);

router.delete('/:id', userController.delete_User);

module.exports = router;