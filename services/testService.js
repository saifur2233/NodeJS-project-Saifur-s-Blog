const db = require('../models')
const blog = db.bloglist

// Create blog
const create = async (data) => { // === send the body only -> same goes for all other method in this file
  const info = {
    title: data.title,
    author: data.author,
    description: data.description
  }

  const blogs = await blog.create(info)
  return blogs
}

module.exports = { create }
