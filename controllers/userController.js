const userService = require('../services/userServices.js');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');
const contentNegotiation = require('../middlewares/contentNegotiation');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUser();

  return contentNegotiation(req, res, users, 200);
});

exports.searchUserById = catchAsync(async (req, res, next) => {
  const user = await userService.searchById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  return contentNegotiation(req, res, user, 200);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await userService.updateUser(req.params.id, req.body);

  return contentNegotiation(req, res, user, 200);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({});
});
