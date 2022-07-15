const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');
const User = require('../models/userModel');

const protectRoutesUser = catchAsync(async (req, res, next) => {
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

  const freshUser = await User.findOne({
    where: {
      username,
    },
  });

  if (!freshUser) {
    return next(new AppError('The user does not exist.', 401));
  }

  // const requestId = Number(req.params.id);
  if (username == freshUser.username) {
    next();
  } else {
    return next(new AppError('Invalid user request', 401));
  }
});

module.exports = protectRoutesUser;
