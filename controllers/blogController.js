const blogService = require('../services/blogServices.js');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.createBlog = catchAsync(async (req, res, next) => {
  const blog = await blogService.createblog(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: blog
    }
  });
});

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await blogService.getAllBlog();

  res.status(200).json({
    status: 'success',
    data: {
      data: blogs
    }
  });
});

exports.searchBlogById = catchAsync(async (req, res, next) => {
  const blog = await blogService.searchById(req.params.id);

  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: blog
    }
  });
});

// update blog
exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await blogService.updateBlog(req.params.id, req.body);

  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: blog
    }
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await blogService.deleteBlog(req.params.id);

  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  res.status(204).json({ });
});
