const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');

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

  req.body.username = username;
  next();
});

module.exports = protectRoutesUser;
