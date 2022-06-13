const blogController = require('../controllers/blogController.js')
const checkLogin = require('../middlewares/checkLogin')

const router = require('express').Router()

router.get('/', blogController.get_allBlogs)

router.get('/:id', blogController.search_blogById)

router.post('/', blogController.create_Blog)

router.put('/:id', checkLogin, blogController.update_Blog)

router.delete('/:id', checkLogin, blogController.delete_Blog)

module.exports = router;
