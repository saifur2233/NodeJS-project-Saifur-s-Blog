const blogController = require('../controllers/blogController.js');


const router = require('express').Router();

router.get('/', blogController.get_allBlogs);

router.post('/', blogController.create_Blog);

router.put('/:id', blogController.update_Blog);

router.delete('/:id', blogController.delete_Blog);

// router.get('/', blogController.get_allBlogs);


// router.get('/:id', blogController.getBlog);

module.exports = router;