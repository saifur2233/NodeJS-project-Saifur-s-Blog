const signupService = require('../services/signupService');
const signinService = require('../services/signinService');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');
const contentNegotiation = require('../middlewares/contentNegotiation');

exports.signUp = catchAsync(async (req, res, next) => {
  const { user, token } = await signupService.registration(req.body);
  const userData = { user, token };
  if (!token || !user) {
    return next(new AppError('User sign up failed', 401));
  }
  return contentNegotiation.sendResponse(req, res, userData, 201);
});

exports.signIn = catchAsync(async (req, res, next) => {
  const data = await signinService.login(req.body);
  if (!data) {
    return next(new AppError('Unauthorized Access', 401));
  }
  return contentNegotiation.sendResponse(req, res, data, 200);
});
