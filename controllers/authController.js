const signupService = require('../services/signupService');
const signinService = require('../services/signin_Service');
const catchAsync = require('../utilities/catchAsync');

//sign up
exports.new_User = catchAsync(async (req, res, next) => {

        const data = await signupService.registration(req.body);
        res.status(201).json({
                status: 'success',
                //access_token: token,
                data: {
                        user: data
                }
        });
});

//sign in
exports.signin_User = catchAsync(async (req, res, next) => {

        const data = await signinService.login(req, res, next);
        res.status(200).json({
                status: 'success',
                data: {
                        user: data
                }
        });
});