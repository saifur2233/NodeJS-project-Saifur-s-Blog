const httpMocks = require('node-mocks-http');
const blogService = require('../../services/blogServices');
const blogController = require('../../controllers/blogController');
const contentNegotiation = require('../../middlewares/contentNegotiation');

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
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Get all blog testing process', async () => {
    jest
      .spyOn(contentNegotiation, 'sendResponse')
      .mockImplementation((req, res, inputData, statuscode) => {
        res.statusCode = statuscode || 200;
        return res.json(inputData);
      });
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
});
