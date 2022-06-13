const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = db.user;

const login = async (signinData) => {
  const { username, password } = signinData;
  // 1. Check if username and password exit
  if (!username) {
    return null
  }
  if (!password) {
    return null
  }
  // 2. check if user exists && password is correct
  const user = await User.findOne({
    where: {
      username
    }
  });

  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      // 3. If everything ok, send token to client
      const token = jwt.sign({
        username: user.username,
        id: user.id
      }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
      });

      return token;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = { login };
