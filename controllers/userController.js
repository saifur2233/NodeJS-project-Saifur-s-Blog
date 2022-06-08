//const db = require('../models');
const userService = require('../services/userServices');
//create main model

// Get all user
const get_AllUsers = async (req, res, next) =>{
    const data = await userService.getUser(req, res, next);
    res.status(200).send(data);
    //console.log(data);
};

//create new user
const create_User = async (req, res, next) =>{
    const data = await userService.createUser(req, res, next);
    res.status(201).send(data);
    //console.log(data);
};


//update user
const update_User = async (req, res, next) =>{
    const data = await userService.updateUser(req, res, next);
    res.status(202).send(data);
    //console.log(data);
};


//delete user
const delete_User = async (req, res, next) =>{
    const data = await userService.deleteUser(req, res, next);
    res.status(204).send('User deleted');
    console.log('User deleted');
};

module.exports = {
    get_AllUsers, 
    create_User,
    update_User,
    delete_User
};
