const blogController = require('../controllers/blogController.js');

const router = require('express').Router();

router.post('/', blogController.addBlog);

router.get('/', blogController.getAllBlog);

router.get('/:id', blogController.getOneBlog);

router.put('/:id', blogController.updateBlog);

router.delete('/:id', blogController.deleteBlog);

module.exports = router;