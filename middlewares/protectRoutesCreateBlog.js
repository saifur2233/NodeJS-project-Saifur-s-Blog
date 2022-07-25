const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');

const protectRoutesCreateBlog = catchAsync(async (req, res, next) => {
  let token;
  //console.log('called');
  //console.log(req.cookies.macaron);
  //console.log(req.cookies['macaron']);
  if (req.cookies.macaron) {
    token = req.cookies.macaron;
  } else {
    return undefined;
  }
  if (!token) {
    return next(new AppError('You are not authorized', 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { username, userId } = decoded;

  req.body.username = username;
  next();
});

module.exports = protectRoutesCreateBlog;
