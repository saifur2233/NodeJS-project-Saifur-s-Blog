const httpMocks = require('node-mocks-http');
const blogService = require('../../services/blogServices');
const blogController = require('../../controllers/blogController');
const contentNegotiation = require('../../middlewares/contentNegotiation');
const AppError = require('../../utilities/AppError');

const myBlogs = [
  {
    id: 1,
    title: 'Hi Everyone, i am saifur',
    username: 'saifur1',
    description: 'hekknhkfnghdfdfdfdfdfdfdfdfdfdfdfdfhvvdlknkvsdnnnlsdf',
    createdAt: '2022-06-21T12:00:22.000Z',
    updatedAt: '2022-06-22T05:45:27.000Z',
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

describe('Blog controller testing', () => {
  beforeEach(() => {
    jest
      .spyOn(contentNegotiation, 'sendResponse')
      .mockImplementation((req, res, inputData, statuscode) => {
        res.statusCode = statuscode || 200;
        return res.json(inputData);
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create blog all condition testing', () => {
    test('Create blog testing process', async () => {
      jest.spyOn(blogService, 'createblog').mockReturnValue(myBlogs[0]);
      const { title, username, description } = myBlogs[0];
      const info = { title, username, description };
      const mreq = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: info.title,
          username: info.username,
          description: info.description,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const mystatus = 201;
      await blogController.createBlog(mreq, mres, mnext);
      const mResData = mres._getJSONData();
      expect(blogService.createblog).toHaveBeenCalledTimes(1);
      expect(blogService.createblog).toHaveBeenCalledWith(info);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(
        mreq,
        mres,
        myBlogs[0],
        mystatus
      );
      expect(mres.statusCode).toBe(mystatus);
      expect(mResData).toEqual(myBlogs[0]);
    });
  });

  test('Get all blog testing process', async () => {
    jest.spyOn(blogService, 'getAllBlog').mockReturnValue(myBlogs);
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'application/json',
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 200;
    await blogController.getAllBlogs(mreq, mres, mnext);
    const mResData = mres._getJSONData();
    expect(blogService.getAllBlog).toHaveBeenCalledTimes(1);
    expect(blogService.getAllBlog).toHaveBeenCalledWith();
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(
      mreq,
      mres,
      myBlogs,
      mystatus
    );
    expect(mres.statusCode).toBe(mystatus);
    expect(mResData).toEqual(myBlogs);
  });

  test('Search blog by Id testing process', async () => {
    jest.spyOn(blogService, 'searchById').mockReturnValue(myBlogs[0]);
    const { id } = myBlogs[0];
    const searchingId = id;
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'application/json',
      },
      method: 'GET',
      params: {
        id: id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 200;
    await blogController.searchBlogById(mreq, mres, mnext);
    const mResData = mres._getJSONData();
    expect(blogService.searchById).toHaveBeenCalledTimes(1);
    expect(blogService.searchById).toHaveBeenCalledWith(searchingId);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
    expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(
      mreq,
      mres,
      myBlogs[0],
      mystatus
    );
    expect(mres.statusCode).toBe(mystatus);
    expect(mResData).toBeTruthy();
  });

  describe('Blog update all condition testing', () => {
    test('Update blog by Id testing process', async () => {
      jest.spyOn(blogService, 'updateBlog').mockReturnValue(1);
      const { id, title, username, description } = myBlogs[0];
      const searchingId = id;
      const info = { title, username, description };
      const mreq = httpMocks.createRequest({
        method: 'PUT',
        params: {
          id: id,
        },
        body: {
          title: info.title,
          username: info.username,
          description: info.description,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const mystatus = 200;
      await blogController.updateBlog(mreq, mres, mnext);
      const mResData = mres._getJSONData();
      expect(blogService.updateBlog).toHaveBeenCalledTimes(1);
      expect(blogService.updateBlog).toHaveBeenCalledWith(searchingId, info);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(
        mreq,
        mres,
        1,
        mystatus
      );
      expect(mres.statusCode).toBe(mystatus);
      expect(mResData).toBe(1);
    });

    test('if blog not found for update condition testing', async () => {
      jest.spyOn(blogService, 'updateBlog').mockReturnValue(1);
      const { id, title, username, description } = myBlogs[0];
      const searchingId = 100;
      const info = { title, username, description };
      const mreq = httpMocks.createRequest({
        method: 'PUT',
        params: {
          id: id,
        },
        body: {
          title: info.title,
          username: info.username,
          description: info.description,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const myError = new AppError('Failed Blog update process', 404);
      await blogController.updateBlog(mreq, mres, mnext);
      expect(blogService.updateBlog).toHaveBeenCalledTimes(1);
      expect(blogService.updateBlog).toHaveBeenCalledWith(id, info);
      //expect(mres).toHaveBeenCalledTimes(1);
      //expect(mnext).toHaveBeenCalledWith(myError);
      //console.log(mnext);
    });
  });

  describe('Blog delete all condition testing', () => {
    test('Blog Delete by id testing process', async () => {
      jest.spyOn(blogService, 'deleteBlog').mockReturnValue(myBlogs[0]);
      const { id } = myBlogs[0];
      const blogId = id;
      const mreq = httpMocks.createRequest({
        method: 'DELETE',
        params: {
          id: id,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const mystatus = 204;
      await blogController.deleteBlog(mreq, mres, mnext);
      expect(blogService.deleteBlog).toHaveBeenCalledTimes(1);
      expect(blogService.deleteBlog).toHaveBeenCalledWith(blogId);
      expect(mres.statusCode).toBe(mystatus);
    });

    test('if blog not found condition testing', async () => {
      jest.spyOn(blogService, 'deleteBlog').mockReturnValue();
      const blogId = '';
      const mreq = httpMocks.createRequest({
        method: 'DELETE',
        params: {
          id: blogId,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const myError = new AppError('No blog found with that ID', 404);
      await blogController.deleteBlog(mreq, mres, mnext);
      expect(blogService.deleteBlog).toHaveBeenCalledTimes(1);
      expect(blogService.deleteBlog).toHaveBeenCalledWith(blogId);
      expect(mnext).toHaveBeenCalledTimes(1);
      expect(mnext).toHaveBeenCalledWith(myError);
    });
  });
});
