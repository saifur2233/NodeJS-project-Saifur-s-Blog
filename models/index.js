const db_config = require('../dbconfig/config.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    db_config.DB,
    db_config.USER,
    db_config.PASSWORD, {
        host: db_config.HOST,
        dialect: db_config.dialect,
        operatorsAliases: false,

        pool: {
            max: db_config.pool.max,
            min: db_config.pool.min,
            acquire: db_config.pool.acquire,
            idle: db_config.pool.idle,
        }
    }
);


sequelize.authenticate()
.then(() => {
    console.log('Database Connected');
})
.catch(err => {
    console.log('Error is '+err);
});

const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./allUsersModel.js')(sequelize, DataTypes);
db.user = require('./UserModel.js')(sequelize, DataTypes);
db.bloglist = require('./allBlogsModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('Database Sync done');
});

module.exports = db;