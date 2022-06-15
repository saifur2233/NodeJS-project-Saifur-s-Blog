const blogController = require('../controllers/blogController.js');
const checkLogin = require('../middlewares/checkLogin');

const router = require('express').Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route('/:id')
  .get(blogController.searchBlogById)
  .put(checkLogin, blogController.updateBlog)
  .delete(checkLogin, blogController.deleteBlog);

module.exports = router;
