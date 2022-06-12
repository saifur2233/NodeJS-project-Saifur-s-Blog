const testService = require('../services/testService');
const catchAsync = require('../utilities/catchAsync');



exports.createBlog = catchAsync(async (req, res) => {
    const newBlog = await testService.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: newBlog
            }
        });
});