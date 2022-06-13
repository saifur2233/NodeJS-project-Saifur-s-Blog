// const testService = require('../services/testService');
const catchAsync = require('../utilities/catchAsync')
const AppError = require('../utilities/appError')
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = db.user

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body
  // 1. Check if username and password exit
  if (!username || !password) {
    return next(new AppError('Please provide username and password!', 400))
  }
  // 2. check if user exists && password is correct

  const user = await User.findOne({
    where: {
      username
    }
  })

  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (isValidPassword) {
      const token = jwt.sign({
        username: user.username,
        id: user.id
      }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
      })
      res.status(200).json({
        status: 'success',
        token
      })
    } else {
      return next(new AppError('Invalid username/passoword', 401))
    }
  } else {
    return next(new AppError('Invalid username/passoword', 401))
  }
  // 3. If everything ok, send token to client
})
