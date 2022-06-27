const userService = require('../services/userServices.js');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');
const contentNegotiation = require('../middlewares/contentNegotiation');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUser();
  if (!users) {
    return next(new AppError('No user found', 404));
  }
  return contentNegotiation.sendResponse(req, res, users, 200);
});

exports.searchUserById = catchAsync(async (req, res, next) => {
  const user = await userService.searchById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  return contentNegotiation.sendResponse(req, res, user, 200);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await userService.updateUser(req.params.id, req.body);

  if (!user) {
    return next(new AppError('Failed update process', 404));
  }
  return contentNegotiation.sendResponse(req, res, user, 200);
});

exports.deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({});
});
