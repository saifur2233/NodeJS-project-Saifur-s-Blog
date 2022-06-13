const db = require('../models');
const blog = db.bloglist

// Create blog
const createblog = async (data) => { // === send the body only -> same goes for all other method in this file
    let info = {
        title: data.title,
        author: data.author,
        description: data.description,
    }

    const blogs = await blog.create(info);
    return blogs;
}

//get all blog
const getAllBlog = async () => {
    let blogs = await blog.findAll({});
    return blogs;
}

// search blog by id
const searchById = async (blogId) => {
    let id = blogId;
    let blogs = await blog.findOne({
        where: {id: id}
    });
    return blogs;
}

//update blog
const updateBlog = async (dataId, data) => {
    let id = dataId;
    let blogs = await blog.update(data, 
        {where: {id: id}});
    return blogs;
}

//Delete blog
const deleteBlog = async (data) => {
    let id = data;
    let blogs = await blog.destroy({where: {id:id}});
    return blogs;
}

module.exports = {createblog, getAllBlog, searchById, updateBlog, deleteBlog};
