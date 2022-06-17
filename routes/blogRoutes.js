const blogController = require('../controllers/blogController.js');
const protectRoutesBlog = require('../middlewares/protectRoutesBlog');
const protectRoutesCreateBlog = require('../middlewares/protectRoutesCreateBlog');
const router = require('express').Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(protectRoutesCreateBlog, blogController.createBlog);

router
  .route('/:id')
  .get(blogController.searchBlogById)
  .put(protectRoutesBlog, blogController.updateBlog)
  .delete(protectRoutesBlog, blogController.deleteBlog);

module.exports = router;
