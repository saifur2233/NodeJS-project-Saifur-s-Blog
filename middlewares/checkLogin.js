const AppError = require('../utilities/appError')
const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.user

const checkLogin = async (req, res, next) => {
  const { authorization } = req.headers
  try {
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { username, userId } = decoded
    req.username = username
    req.userId = userId
    const reqUserId = req.params.id;
    console.log('request user ID: ', reqUserId);
    const findUser = await User.findOne({
      where: {
        username: username
      }
    });
    if (reqUserId === findUser.id) {
      next();
    } else {
      return next(new AppError('User Invalid Request', 401));
    }
  } catch (err) {
    next(err)
  }
}

module.exports = checkLogin
