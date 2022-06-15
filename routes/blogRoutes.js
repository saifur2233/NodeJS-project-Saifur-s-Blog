const blogController = require('../controllers/blogController.js');
const protectRoutes = require('../middlewares/protectRoutes');

const router = require('express').Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route('/:id')
  .get(blogController.searchBlogById)
  .put(protectRoutes, blogController.updateBlog)
  .delete(protectRoutes, blogController.deleteBlog);

module.exports = router;
