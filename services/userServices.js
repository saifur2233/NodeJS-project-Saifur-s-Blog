const db = require('../models');
const Users = db.user;

const getAllUser = async (req, res, next) => {
  const users = await Users.findAll({});
  return users;
}

const searchById = async (userId) => {
  const id = userId;
  const user = await Users.findOne({
    where: { id }
  });
  return user;
};

const updateUser = async (userId, data) => {
  const id = userId;
  const user = await Users.update(data,
    { where: { id } });
  return user;
}

const deleteUser = async (userId) => {
  const id = userId;
  const user = await Users.destroy({ where: { id } });
  return user;
}

module.exports = { getAllUser, searchById, updateUser, deleteUser };
