const blogService = require('../services/blogServices.js');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');
const contentNegotiation = require('../middlewares/contentNegotiation');

exports.createBlog = catchAsync(async (req, res, next) => {
  const blog = await blogService.createblog(req.body);

  if (!blog) {
    return next(new AppError('Failed blog create process', 404));
  }

  return contentNegotiation.sendResponse(req, res, blog, 201);
});

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await blogService.getAllBlog();
  if (!blogs) {
    return next(new AppError('No blog found', 404));
  }
  return contentNegotiation.sendResponse(req, res, blogs, 200);
});

exports.searchBlogById = catchAsync(async (req, res, next) => {
  const blog = await blogService.searchById(req.params.id);

  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  return contentNegotiation.sendResponse(req, res, blog, 200);
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await blogService.updateBlog(req.params.id, req.body);

  if (!blog) {
    return next(new AppError('Failed Blog update process', 404));
  }

  return contentNegotiation.sendResponse(req, res, blog, 200);
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await blogService.deleteBlog(req.params.id);

  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  res.status(204).json({});
});
