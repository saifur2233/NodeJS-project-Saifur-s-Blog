const testController = require('../controllers/testController.js');

const router = require('express').Router();

router.get('/', testController.get_allBlogs);

module.exports = router;