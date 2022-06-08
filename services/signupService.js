const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.user


// Create user
const registration = async (req, res, next) => {
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let info = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        status: req.body.status,
    }

    const user = await User.create(info);
    return user;
}




module.exports = {registration};