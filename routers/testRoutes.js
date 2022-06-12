const testController = require('../controllers/testController');

const router = require('express').Router();

router.post('/test', testController.createBlog);

module.exports = router;