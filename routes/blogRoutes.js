const blogController = require('../controllers/blogController.js');
const protectRoutes = require('../middlewares/protectRoutes.js').protectRoutes;
const router = require('express').Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(protectRoutes('blogcreate'), blogController.createBlog);

router
  .route('/:id')
  .get(blogController.searchBlogById)
  .put(protectRoutes('myblog'), blogController.updateBlog)
  .delete(protectRoutes('myblog'), blogController.deleteBlog);

module.exports = router;
