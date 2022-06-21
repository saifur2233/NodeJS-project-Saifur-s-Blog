const db = require('./index');
const { DataTypes } = require('sequelize');

const blog = db.sequelize.define('bloglist', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Blog Title is required',
      },
      notEmpty: {
        msg: 'Please provide a title',
      },
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(10000),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Blog description is required',
      },
      notEmpty: {
        msg: 'Please provide a description',
      },
    },
  },
});

module.exports = blog;
