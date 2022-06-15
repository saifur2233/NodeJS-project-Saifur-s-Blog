const dbConfig = require('../dbconfig/config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log('Error is ' + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./userModel.js')(sequelize, DataTypes);
db.bloglist = require('./blogModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log('Database Sync done');
});

module.exports = db;
