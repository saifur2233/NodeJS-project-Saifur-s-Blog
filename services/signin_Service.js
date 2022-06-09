const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.user


// Create user
const login = async (req, res, next) => {
    try {
        const user = await User.findAll(
            {where: {username: req.body.username}
    });
    
        if(user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
    
            if(isValidPassword) {
                //generate token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, 'saifur', {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    "access_token": token,
                    "message": "login successfully"
                });
                
            } else {
                res.status(401).json({
                    "error": "Authentication Failed!... "
                });
            }
        } else {
            res.status(401).json({
                "error": "Unauthorized Access "
                });
        }
    } catch (error) {
        res.status(401).json({
            "error": "Unauthorized Access "
            });
    }
};

module.exports = {login};