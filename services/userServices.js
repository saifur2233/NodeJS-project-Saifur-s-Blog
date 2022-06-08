const db = require('../models');

const Users = db.users

//get blog
const getUser = async (req, res, next) => {
    let user = await Users.findAll({});
    return user;
}

// Create blog
const createUser = async (req, res, next) => {
    let info = {
        name: req.body.name,
        email: req.body.email,
    }

    const user = await Users.create(info);
    return user;
}


//update blog
const updateUser = async (req, res, next) => {

    let id  = req.params.id;
    let user = await Users.update(req.body, 
        {where: {id: id}});
    return user;
}

//Delete blog
const deleteUser = async (req, res, next) => {
    let id  = req.params.id;
    let user = await Users.destroy({where: {id:id}});
    return user;
}

module.exports = {getUser, createUser, updateUser, deleteUser};