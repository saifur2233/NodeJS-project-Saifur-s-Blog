const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.user;

const login = async (signinData) => {
  const { username, password } = signinData;

  if (!username || !password) {
    return null;
  }

  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) return null;
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) return null;

  const token = jwt.sign(
    {
      username: user.username,
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    }
  );
  return token;
};

module.exports = { login };
