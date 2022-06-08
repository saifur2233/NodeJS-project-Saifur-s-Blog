const testController = require('../controllers/testController.js');

const router = require('express').Router();

router.post('/', testController.new_User);

module.exports = router;