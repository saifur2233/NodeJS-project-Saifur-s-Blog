const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registration = async (data) => {
  const myPlaintextPassword = data.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(myPlaintextPassword, salt);

  const info = {
    name: data.name,
    username: data.username,
    email: data.email,
    password: hashedPassword,
  };

  await User.create(info);

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

  return token;
};

module.exports = { registration };
