//dependencies
const blogService = require('../services/blogServices.js');


const get_allBlogs = async (req, res, next) =>{
    const data = await blogService.getBlog(req, res, next);
    res.status(200).send(data);
    console.log(data);
};

module.exports = {get_allBlogs};