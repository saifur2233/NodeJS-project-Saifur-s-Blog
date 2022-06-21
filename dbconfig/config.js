const Sequelize = require('sequelize');
require('dotenv').config();

const database = 'myblog_db';
const db_user = 'mysql';
const password = '';
const host_url = 'localhost';

const db = new Sequelize(database, db_user, password, {
  host: host_url,
  logging: false,
  dialect: 'mysql',
});

module.exports = db;
