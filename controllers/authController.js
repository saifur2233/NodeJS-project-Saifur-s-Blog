const signupService = require('../services/signupService');
const signinService = require('../services/signin_Service');


//sign up
const new_User = async (req, res, next) => {

        const data = await signupService.registration(req, res, next);
        res.status(201).send(data);
}

//sign in
const signin_User = async (req, res, next) => {

        const data = await signinService.login(req, res, next);
        res.status(200).send(data);

        // const user = await User.findAll(
        //         {where: {username: req.body.username}
        // });
        
        //     if(user && user.length > 0) {
        //         const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
        
        //         if(isValidPassword) {
        //             //generate token
        //             const token = jwt.sign({
        //                 username: user[0].username,
        //                 userId: user[0]._id,
        //             }, 'saifur', {
        //                 expiresIn: '1h'
        //             });
        //             res.status(200).json({
        //                 "access_token": token,
        //                 "message": "login successfully"
        //             });
                    
        //         } else {
        //             res.status(401).json({
        //                 "error": "Username and Password is not correct. "
        //             });
        //         }
        //     } else {
        //         res.status(401).json({
        //                 "access_token": token,
        //                 "message": "Unauthorized Access "
        //             });
        //     }
        
};
module.exports = {new_User, signin_User}; 