const db = require('../models')

const Users = db.user

// get blog
const getAllUser = async (req, res, next) => {
  const users = await Users.findAll({})
  return users
}

// update blog
const updateUser = async (userId, data) => {
  const id = userId
  const user = await Users.update(data,
    { where: { id } })
  return user
}

// Delete blog
const deleteUser = async (userId) => {
  const id = userId
  const user = await Users.destroy({ where: { id } })
  return user
}

module.exports = { getAllUser, updateUser, deleteUser }
