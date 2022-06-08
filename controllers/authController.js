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
        res.status(201).send(data);
}
module.exports = {new_User, signin_User}; 