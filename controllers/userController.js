const userService = require('../services/userServices.js');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/AppError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUser();

  res.status(200).json({
    status: 'success',
    data: {
      data: users
    }
  });
});

exports.searchUserById = catchAsync(async (req, res, next) => {
  const user = await userService.searchById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: user
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await userService.updateUser(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      data: user
    }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({});
});
