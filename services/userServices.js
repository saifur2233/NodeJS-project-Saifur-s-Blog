const Users = require('../models/userModel');

const getAllUser = async () => {
  const users = await Users.findAll({});
  return users;
};

const searchById = async (myusername) => {
  const username = myusername;
  const user = await Users.findOne({
    where: { username },
  });
  return user;
};

const updateUser = async (myusername, data) => {
  const username = myusername;
  const user = await Users.update(data, { where: { username } });
  return user;
};

const deleteUser = async (myusername) => {
  const username = myusername;
  const user = await Users.destroy({ where: { username } });
  return user;
};

module.exports = { getAllUser, searchById, updateUser, deleteUser };
