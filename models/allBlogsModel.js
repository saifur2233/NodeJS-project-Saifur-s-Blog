//const { DataTypes } = require("sequelize/types");
//const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const blog = sequelize.define("bloglist", {
        title: {
            type: DataTypes.STRING,
            //allowNull: false
        },
        author: {
            type:DataTypes.STRING,
            //allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            //allowNull: false
        }
    })
    return blog;
}