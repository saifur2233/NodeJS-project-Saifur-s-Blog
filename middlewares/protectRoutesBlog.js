const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');
const User = require('../models/userModel');
const Blog = require('../models/blogModel');

const protectRoutesBlog = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not authorized', 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { username } = decoded;

  const findblog = await Blog.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!findblog) {
    return next(new AppError('The blog does not exist.', 401));
  }

  const blogAuthorUsername = findblog.username;

  const isUserExist = await User.findOne({
    where: {
      username: blogAuthorUsername,
    },
  });
  if (!isUserExist) {
    return next(new AppError('This User does not exist.', 401));
  }

  if (blogAuthorUsername === username) {
    next();
  } else {
    return next(new AppError('Invalid user request', 401));
  }
});

module.exports = protectRoutesBlog;
