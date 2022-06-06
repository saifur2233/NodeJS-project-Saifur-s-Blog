const db = require('../models');

//create main model

const user = db.users

const addUser  = async (req, res) => {
    let info = {
        name: req.body.name,
        email: req.body.email,
    }

    const Users = await user.create(info);
    res.status(201).send(Users);
    console.log(Users);
}


// get all blogs
const getAllUsers = async (req, res) => {
    let users = await user.findAll({});
    res.status(200).send(users); 
}

// get one blogs
const getOneUser = async (req, res) => {
    let id  = req.params.id;
    let users = await user.findOne({
        where: {id:id}
    })
    res.status(200).send(users); 
}

// update blogs
const updateUser = async (req, res) => {
    let id  = req.params.id;
    let users = await user.update(req.body, 
        {where: {id: id}});
    res.status(202).send(users); 
}

// Delete blogs
const deleteUser = async (req, res) => {
    let id  = req.params.id;
    let users = await user.destroy({where: {id:id}});
    res.status(204).send('Blog is deleted'); 
}

module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
}