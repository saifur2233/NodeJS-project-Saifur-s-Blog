const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');
const db = require('../models/index');
const { get } = require('../routes/blogRoutes');
const User = db.user;
const Blog = db.bloglist;

const getUsernameFromToken = (req) => {
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
  const { username, userId } = decoded;
  return username;
};

const protectRoutes = (requestRoutes) => {
  return catchAsync(async (req, res, next) => {
    const username = getUsernameFromToken(req);

    if (requestRoutes == 'myuser') {
      const freshUser = await User.findOne({
        where: {
          username,
        },
      });

      if (!freshUser) {
        return next(new AppError('The user does not exist.', 401));
      }

      const requestId = Number(req.params.id);
      if (requestId === freshUser.id) {
        next();
      } else {
        return next(new AppError('Invalid user request', 401));
      }
    } else if (requestRoutes == 'myblog') {
      const findblog = await Blog.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!findblog) {
        return next(new AppError('The blog does not exist.', 401));
      }

      const blogAuthorUsername = findblog.username;
      if (blogAuthorUsername === username) {
        next();
      } else {
        return next(new AppError('Invalid user request', 401));
      }
    }
  });
};

module.exports = { protectRoutes, getUsernameFromToken };
