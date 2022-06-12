//const db = require('../models');
const blogService = require('../services/blogServices.js');
//create main model

// Get all blogs
const get_allBlogs = async (req, res, next) =>{
    const data = await blogService.getBlog(req, res, next);
    res.status(200).send(data);
    //console.log(data);
};

//create new blog
const create_Blog = async (req, res, next) =>{
    const data = await blogService.createBlog(req, res, next);
    res.status(201).send(data);
    //console.log(data);
};


//update blog
const update_Blog = async (req, res, next) =>{
    const data = await blogService.updateBlog(req, res, next);
    res.status(200).send(data); // === why 202?
    //console.log(data);
};



//delete blog
const delete_Blog = async (req, res, next) =>{
    const data = await blogService.deleteBlog(req, res, next); // === don't send these to service class
    res.status(204); // === fix this
};

module.exports = {
    get_allBlogs, 
    create_Blog,
    update_Blog,
    delete_Blog
};