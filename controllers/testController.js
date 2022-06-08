//dependencies
// const blogService = require('../services/blogServices.js');


// const get_allBlogs = async (req, res, next) =>{
//     const data = await blogService.getBlog(req, res, next);
//     res.status(200).send(data);
//     console.log(data);
// };

// module.exports = {get_allBlogs};


const signupService = require('../services/signupService');

const new_User = async (req, res, next) => {

        const data = await signupService.registration(req, res, next);
        res.status(201).send(data);
}
module.exports = {new_User}; 
//         res.status(200).json({
//             message: "User Registration Failed"
//         });
//         console.log("Registration Fail Error: ",error);
    
//     
//     //console.log(data);
// };

// module.exports = new_User;