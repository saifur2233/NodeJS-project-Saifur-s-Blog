const userService = require('../services/userServices.js');
const catchAsync = require('../utilities/catchAsync');

// get all user
exports.get_AllUsers = catchAsync(async (req, res, next) => {
    const users = await userService.getAllUser();

        res.status(200).json({
            status: 'success',
            All_Users: {
                data: users
            }
        });
});

// update blog
exports.update_User = catchAsync(async (req, res, next) => {
    const user = await userService.updateUser(req.params.id, req.body);

        res.status(200).json({
            status: 'success',
            update_data: {
                data: user
            }
        });
});

//delete user
exports.delete_User = catchAsync(async (req, res, next) => {
    const user = await userService.deleteUser(req.params.id);
        res.status(204);
});
