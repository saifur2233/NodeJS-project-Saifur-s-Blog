const signupService = require('../services/signupService')
const signinService = require('../services/signinService')
const catchAsync = require('../utilities/catchAsync')
const AppError = require('../utilities/appError')

exports.userSignUp = catchAsync(async (req, res, next) => {
  const { user, token } = await signupService.registration(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      accessToken: token,
      data: user
    }
  });
});

exports.userSignIn = catchAsync(async (req, res, next) => {
  const data = await signinService.login(req.body)
  if (!data) {
    return next(new AppError('Unauthorized Access', 401))
  }
  res.status(200).json({
    status: 'success',
    data: {
      access_token: data
    }
  });
});
