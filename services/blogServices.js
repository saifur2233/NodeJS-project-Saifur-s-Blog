const db = require('../models');

const blog = db.bloglist

//get blog
const getBlog = async (req, res, next) => {
    let blogs = await blog.findAll({});
    return blogs;
}

// Create blog
const createBlog = async (req, res, next) => { // === send the body only -> same goes for all other method in this file
    let info = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
    }

    const blogs = await blog.create(info);
    return blogs;
}


//update blog
const updateBlog = async (req, res, next) => {

    let id  = req.params.id;
    let blogs = await blog.update(req.body, 
        {where: {id: id}});
    return blogs;
}

//Delete blog
const deleteBlog = async (req, res, next) => {
    let id  = req.params.id;
    let blogs = await blog.destroy({where: {id:id}});
    return blogs;
}

module.exports = {getBlog, createBlog, updateBlog, deleteBlog};