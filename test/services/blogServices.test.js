const blogService = require('../../services/blogServices');
const blog = require('../../models/blogModel');

const myBlogs = [
  {
    id: 1,
    title: 'Ipsum kannadn',
    username: 'saifur1',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    createdAt: '2022-06-21T12:00:22.000Z',
    updatedAt: '2022-06-21T12:00:22.000Z',
  },
  {
    id: 2,
    title: 'Ipsum kannadn',
    username: 'saifur1',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    createdAt: '2022-06-21T12:00:26.000Z',
    updatedAt: '2022-06-21T12:00:26.000Z',
  },
];

describe('blog service testing', () => {
  test('Blog Create process testing', async () => {
    jest.spyOn(blog, 'create').mockImplementation((inputData) => {
      return inputData;
    });
    const { title, username, description } = myBlogs[0];
    const info = { title, username, description };
    const myblog = await blogService.createblog(info);
    expect(blog.create).toHaveBeenCalledTimes(1);
    expect(blog.create).toHaveBeenCalledWith(info);
    expect(myblog).toBeTruthy();
  });

  test('Get all blog process testing', async () => {
    jest.spyOn(blog, 'findAll').mockReturnValue(myBlogs);
    const allBlog = await blogService.getAllBlog();
    expect(allBlog).toBeTruthy();
  });

  test('Search blog by ID', async () => {
    jest.spyOn(blog, 'findOne').mockReturnValue(myBlogs[0]);
    const { id } = myBlogs[0];
    const myblog = await blogService.searchById(id);
    expect(blog.findOne).toHaveBeenCalledTimes(1);
    expect(blog.findOne).toHaveBeenCalledWith({
      where: { id },
    });
    expect(myblog).toBe(myBlogs[0]);
  });

  test('Update blog info', async () => {
    jest.spyOn(blog, 'update').mockReturnValue(1);
    const { id, title, username, description } = myBlogs[0];
    const info = { title, username, description };
    const myblog = await blogService.updateBlog(id, info);
    expect(blog.update).toHaveBeenCalledTimes(1);
    expect(blog.update).toHaveBeenCalledWith(info, { where: { id } });
    expect(myblog).toBe(1);
  });

  test('Blog delete', async () => {
    jest.spyOn(blog, 'destroy').mockReturnValue();
    const { id } = myBlogs[0];
    const myblog = await blogService.deleteBlog(id);
    expect(blog.destroy).toHaveBeenCalledTimes(1);
    expect(blog.destroy).toHaveBeenCalledWith({ where: { id } });
    expect(myblog).toBe();
  });
});
