const db = require('./index');
const { DataTypes } = require('sequelize');

const User = db.sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A name is required',
      },
      notEmpty: {
        msg: 'Please provide a name',
      },
      is: {
        args: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        msg: 'User name must be only letters',
      },
      len: {
        arg: [3, 30],
        msg: 'Name length must be less than 30 or less',
      },
    },
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    isLowercase: true,
    validate: {
      isLowercase: {
        msg: 'Username must be in lowercase',
      },
      is: {
        args: /^[a-z0-9_\-]+$/g,
        msg: 'Username must be letter and number',
      },
      len: {
        arg: [3, 20],
        msg: 'Username length must be less than 20 or less',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    isEmail: true,
    validate: {
      notNull: {
        msg: 'An email is required',
      },
      isEmail: {
        msg: 'Please provide a valid email',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A password is required',
      },
      notEmpty: {
        msg: 'Please provide a password',
      },
      len: {
        arg: [8, 20],
        msg: 'Password length must be equals to 8 characters or more',
      },
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'inactive',
  },
});

module.exports = User;
