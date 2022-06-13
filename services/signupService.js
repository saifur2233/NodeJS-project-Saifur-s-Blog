const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = db.user

// Create user
const registration = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  const info = {
    name: data.name,
    username: data.username,
    email: data.email,
    password: hashedPassword,
    status: data.status
  }

  const user = await User.create(info)

  // generate token
  const token = jwt.sign({
    username: data.username,
    id: data.id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  })

  return token
}

module.exports = { registration }
