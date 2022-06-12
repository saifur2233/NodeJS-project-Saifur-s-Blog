const db = require('../models');

const Users = db.user

//get blog
const getUser = async (req, res, next) => {
    try {
        let user = await Users.findAll({});
        res.status(200).json({
            "users ": user
        });
    } catch (error) {
        res.status(200).json({
            "error": "failure!"
        });    
    }

}

// Create blog
// const createUser = async (req, res, next) => {
//     let info = {
//         name: req.body.name,
//         email: req.body.email,
//     }

//     const user = await Users.create(info);
//     return user;
// }


//update blog
const updateUser = async (req, res, next) => {

    let id  = req.params.id;
    try {
        let user = await Users.update(req.body, 
            {where: {id: id}});
            res.status(200).json({
                "users ": user
            });
    } catch (error) {
        res.status(200).json({
            "error": "failure!"
        });
    }
};

//Delete blog
const deleteUser = async (req, res, next) => {
    let id  = req.params.id;
    try {
        let user = await Users.destroy({where: {id:id}});
        res.status(200).json({
            "message ": "user deleted"
        });
    } catch (error) {
        res.status(200).json({
            "error": "Deletion failure!"
        });
    }
}

module.exports = {getUser, updateUser, deleteUser};