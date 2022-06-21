const db = require('../dbconfig/config');
const Sequelize = require('sequelize');

const blog = db.define('bloglist', {
  title: {
    type: Sequelize.STRING,
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
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(10000),
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
