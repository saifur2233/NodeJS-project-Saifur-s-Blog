const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');
const db = require('../models/index');
const User = db.user;
const Blog = db.bloglist;

const protectRoutes = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 400)
    );
  }

  // 2. verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { username, userId } = decoded;

  // 3. check if user still exists
  if (requestRoutes == 'user') {
    const freshUser = await User.findOne({
      where: {
        username,
      },
    });

    if (!freshUser) {
      return next(
        new AppError('The user belonging does no longer exist.', 401)
      );
    }

    const requestId = Number(req.params.id);
    console.log(typeof requestId, '====', typeof freshUser.id);
    if (requestId === freshUser.id) {
      next();
    } else {
      return next(new AppError('Invalid user request', 401));
    }
  } else if (requestRoutes == 'blog') {
    const findblog = await Blog.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!findblog) {
      return next(
        new AppError('The user belonging does no longer exist.', 401)
      );
    }

    const blogAuthorUsername = findblog.authorUsername;
    if (!blogAuthorUsername) {
      return next(
        new AppError('The user belonging does no longer exist.', 401)
      );
    }
    if (blogAuthorUsername == username) {
      next();
    } else {
      return next(new AppError('Invalid user request', 401));
    }
  }
});

module.exports = protectRoutes;
