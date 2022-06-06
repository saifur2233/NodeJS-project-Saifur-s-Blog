const db = require('../models');

//create main model

const blog = db.bloglist

const addBlog  = async (req, res) => {
    let info = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
    }

    const Blog = await blog.create(info);
    res.status(201).send(Blog);
    console.log(Blog);
}

// get all blogs
const getAllBlog = async (req, res) => {
    let blogs = await blog.findAll({});
    res.status(200).send(blogs); 
}

// get one blogs
const getOneBlog = async (req, res) => {
    let id  = req.params.id;
    let blogs = await blog.findOne({
        where: {id:id}
    })
    res.status(200).send(blogs); 
}

// update blogs
const updateBlog = async (req, res) => {
    let id  = req.params.id;
    let blogs = await blog.update(req.body, 
        {where: {id: id}});
    res.status(202).send(blogs); 
}

// Delete blogs
const deleteBlog = async (req, res) => {
    let id  = req.params.id;
    let blogs = await blog.destroy({where: {id:id}});
    res.status(204).send('Blog is deleted'); 
}

module.exports = {
    addBlog,
    getAllBlog,
    getOneBlog,
    updateBlog,
    deleteBlog,
    
}