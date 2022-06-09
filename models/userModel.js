//const { DataTypes } = require("sequelize/types");
//const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            //allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            //allowNull: false,
        },
        email: {
            type:DataTypes.STRING,
            defaultValue: 'test@gmail.com',
        },
        password: {
            type: DataTypes.STRING,
            //allowNull: false,
        },
        status:{
            type: DataTypes.STRING,
            //enum: ["active", "inactive"],
        }
    });
    return User;
}