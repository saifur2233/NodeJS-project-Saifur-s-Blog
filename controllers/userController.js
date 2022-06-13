const userService = require('../services/userServices.js')
const catchAsync = require('../utilities/catchAsync')

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUser()

  res.status(200).json({
    status: 'success',
    All_Users: {
      data: users
    }
  })
})

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await userService.updateUser(req.params.id, req.body)

  res.status(200).json({
    status: 'success',
    update_data: {
      data: user
    }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({})
});
