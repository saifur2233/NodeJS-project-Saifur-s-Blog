const signupService = require('../services/signupService');
const signinService = require('../services/signinService');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');
const jwt = require('jsonwebtoken');
exports.signUp = catchAsync(async (req, res, next) => {
  const data = await signupService.registration(req.body);

  const { myusername, token } = data;
  //console.log('this is token', myusername, '====', token);
  if (!token) {
    return next(new AppError('User sign up failed', 401));
  }

  res
    .status(201)
    .cookie('macaron', token, { maxAge: 9000000, httpOnly: true, secure: true })
    .json({
      myusername: myusername,
    });
  //return contentNegotiation.sendResponse(req, res, username, 201);
});

exports.signIn = catchAsync(async (req, res, next) => {
  const data = await signinService.login(req.body);
  const { username, token } = data;
  if (!token) {
    return next(new AppError('Unauthorized Access', 401));
  }
  //console.log('this is token', username, '====', token);
  res
    .status(200)
    .cookie('macaron', token, {
      maxAge: 9000000 * 10000,
      httpOnly: true,
      secure: true,
    })
    .json({
      myusername: username,
    });
});

exports.verifyUser = catchAsync(async (req, res, next) => {
  // console.log('came --');
  // console.log(req.cookies);
  // console.log(req.cookies.macaron);
  const token = req.cookies.macaron;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { username } = decoded;

  // console.log(token);
  //console.log(username);
  res.json({
    myusername: username,
  });
});

exports.signout = catchAsync(async (req, res, next) => {
  console.log('come in sign out');
  //res.clearCookie('macaron');
  //console.log(req.cookies['macaron']);

  res.cookie('macaron', null);
});
