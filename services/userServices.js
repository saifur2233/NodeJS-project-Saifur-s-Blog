const db = require('../models');

const Users = db.user

//get blog
const getAllUser = async (req, res, next) => {
    let users = await Users.findAll({});
    return users;
};


//update blog
const updateUser = async (userId, data) => {
    let id = userId;
    let user = await Users.update(data, 
        {where: {id: id}});
    return user;
};

//Delete blog
const deleteUser = async (userId) => {
    let id  = userId;
    let user = await Users.destroy({where: {id:id}});
    return user;
}

module.exports = {getAllUser, updateUser, deleteUser};