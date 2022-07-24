const signupService = require('../services/signupService');
const signinService = require('../services/signinService');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');

exports.signUp = catchAsync(async (req, res, next) => {
  const data = await signupService.registration(req.body);

  const { myusername, token } = data;
  console.log('this is token', myusername, '====', token);
  if (!token) {
    return next(new AppError('User sign up failed', 401));
  }

  res
    .status(201)
    .cookie('macaron', token, { maxAge: 900000, secure: true })
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
    .cookie('macaron', token, { maxAge: 900000, secure: true })
    .json({
      myusername: username,
    });
});
