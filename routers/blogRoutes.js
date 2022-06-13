const blogController = require('../controllers/blogController.js')
const checkLogin = require('../middlewares/checkLogin')

const router = require('express').Router()

router.get('/', blogController.getAllBlogs)

router.post('/', blogController.createBlog)

router.get('/:id', blogController.searchBlogById)

router.put('/:id', checkLogin, blogController.updateBlog)

router.delete('/:id', checkLogin, blogController.deleteBlog)

module.exports = router;
