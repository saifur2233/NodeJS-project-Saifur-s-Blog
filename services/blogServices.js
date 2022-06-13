const db = require('../models')
const blog = db.bloglist

// Create blog
const createblog = async (data) => { // === send the body only -> same goes for all other method in this file
  const info = {
    title: data.title,
    author: data.author,
    description: data.description
  }

  const blogs = await blog.create(info)
  return blogs
}

// get all blog
const getAllBlog = async () => {
  const blogs = await blog.findAll({})
  return blogs
}

// search blog by id
const searchById = async (blogId) => {
  const id = blogId
  const blogs = await blog.findOne({
    where: { id }
  })
  return blogs
}

// update blog
const updateBlog = async (dataId, data) => {
  const id = dataId
  const blogs = await blog.update(data,
    { where: { id } })
  return blogs
}

// Delete blog
const deleteBlog = async (data) => {
  const id = data
  const blogs = await blog.destroy({ where: { id } })
  return blogs
}

module.exports = { createblog, getAllBlog, searchById, updateBlog, deleteBlog }
