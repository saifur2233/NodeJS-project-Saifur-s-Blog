module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('bloglist', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorUsername: {
      type: DataTypes.STRING,
      //allowNull: false,
      // reference: {
      //   model: users,
      //   key: 'username',
      //   //deferrable: Deferrable.INITIALLY_IMMEDIATE,
      // },
    },
    description: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
  });
  return blog;
};
