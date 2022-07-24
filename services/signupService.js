const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const registration = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const myusername = data.username;
  const userData = {
    name: data.name,
    username: data.username,
    email: data.email,
    password: hashedPassword,
  };
  await User.create(userData);
  const token = jwt.sign(
    {
      username: data.username,
      id: data.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    }
  );
  return { myusername, token };
};
module.exports = { registration };
