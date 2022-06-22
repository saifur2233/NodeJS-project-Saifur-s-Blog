const blogService = require('../../services/blogServices');
const blog = require('../../models/blogModel');

const dummyBlogs = [
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

describe('blog service test', () => {
  test('Get all blog', async () => {
    jest.spyOn(blog, 'findAll').mockReturnValue(dummyBlogs);
    const allBlog = await blogService.getAllBlog();
    expect(allBlog).toBe(dummyBlogs);
  });
});
