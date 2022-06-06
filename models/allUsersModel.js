//const { DataTypes } = require("sequelize/types");
//const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("allusers", {
        name: {
            type: DataTypes.STRING,
            //allowNull: false
        },
        email: {
            type:DataTypes.STRING,
            defaultValue: 'test@gmail.com',
        }
    });
    return Users;
}