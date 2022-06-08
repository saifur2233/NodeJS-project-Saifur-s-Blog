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
    res.status(202).send(data);
    //console.log(data);
};


//delete blog
const delete_Blog = async (req, res, next) =>{
    const data = await blogService.deleteBlog(req, res, next);
    res.status(204).send('Blog deleted');
    console.log('Blog deleted');
};

module.exports = {
    get_allBlogs, 
    create_Blog,
    update_Blog,
    delete_Blog
};





//const blog = db.bloglist
// const createBlog  = async (req, res) => {
//     let info = {
//         title: req.body.title,
//         author: req.body.author,
//         description: req.body.description,
//     }

//     const Blog = await blog.create(info);
//     res.status(201).send(Blog);
//     console.log(Blog);
// }

// // get all blogs
// const get_allBlogs = async (req, res) => {
//     let blogs = await blog.findAll({});
//     res.status(200).send(blogs); 
// }

// // get one blogs
// const getBlog = async (req, res) => {
//     let id  = req.params.id;
//     let blogs = await blog.findOne({
//         where: {id:id}
//     })
//     res.status(200).send(blogs); 
// }

// // update blogs
// const updateBlog = async (req, res) => {
//     let id  = req.params.id;
//     let blogs = await blog.update(req.body, 
//         {where: {id: id}});
//     res.status(202).send(blogs); 
// }

// // Delete blogs
// const deleteBlog = async (req, res) => {
//     let id  = req.params.id;
//     let blogs = await blog.destroy({where: {id:id}});
//     res.status(204).send('Blog is deleted'); 
// }

// module.exports = {
//     createBlog,
//     get_allBlogs,
//     getBlog,
//     updateBlog,
//     deleteBlog,
    
// }