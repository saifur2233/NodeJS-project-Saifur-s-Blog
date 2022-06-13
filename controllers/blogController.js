const blogService = require('../services/blogServices.js')
const catchAsync = require('../utilities/catchAsync')
const AppError = require('../utilities/appError')
// Create blog
exports.create_Blog = catchAsync(async (req, res, next) => {
  const newBlog = await blogService.createblog(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      data: newBlog
    }
  })
})

// get all blog
exports.get_allBlogs = catchAsync(async (req, res, next) => {
  const blogs = await blogService.getAllBlog()

  res.status(200).json({
    status: 'success',
    All_Blog: {
      data: blogs
    }
  })
});

exports.search_blogById = catchAsync(async (req, res, next) => {
  const blogs = await blogService.searchById(req.params.id)

  if (!blogs) {
    return next(new AppError('No blog found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: blogs
    }
  });
});

// update blog
exports.update_Blog = catchAsync(async (req, res, next) => {
  const blogs = await blogService.updateBlog(req.params.id, req.body)

  if (!blogs) {
    return next(new AppError('No blog found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    update_data: {
      data: blogs
    }
  })
})

exports.delete_Blog = catchAsync(async (req, res, next) => {
  const blogs = await blogService.deleteBlog(req.params.id)

  if (!blogs) {
    return next(new AppError('No blog found with that ID', 404))
  }

  res.status(204).json({ })
})
