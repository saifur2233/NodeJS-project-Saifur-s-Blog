const blog = require('../models/blogModel');
const { Op } = require('sequelize');
const createblog = async (data) => {
  const info = {
    title: data.title,
    username: data.username,
    description: data.description,
  };

  const blogs = await blog.create(info);
  return blogs;
};

const getAllBlog = async () => {
  const blogs = await blog.findAll({});
  return blogs;
};

const getAuthorAllBlog = async (authorUsername) => {
  const blogs = await blog.findAll({
    where: {
      username: {
        [Op.like]: '%' + authorUsername + '%',
      },
    },
  });
  return blogs;
};

const searchById = async (blogId) => {
  const id = blogId;
  const blogs = await blog.findOne({
    where: { id },
  });
  return blogs;
};

const updateBlog = async (dataId, data) => {
  const id = dataId;
  const blogs = await blog.update(data, { where: { id } });
  return blogs;
};

const deleteBlog = async (data) => {
  const id = data;
  const blogs = await blog.destroy({ where: { id } });
  return blogs;
};

module.exports = {
  createblog,
  getAllBlog,
  getAuthorAllBlog,
  searchById,
  updateBlog,
  deleteBlog,
};
