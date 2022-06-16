module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('bloglist', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
  });
  return blog;
};
