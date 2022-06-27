const httpMocks = require('node-mocks-http');
const userService = require('../../services/userServices');
const userController = require('../../controllers/userController');
const contentNegotiation = require('../../middlewares/contentNegotiation');
const AppError = require('../../utilities/AppError');

const myUsers = [
  {
    id: 1,
    name: 'Saifur Rahman',
    username: 'saifur1',
    email: 'saif@gmail.com',
    password: '$2b$10$ZNPG2viT21nCU26u.2D7.eSDX3P0yjE3Fda0/EjuuB51OPmMlTn9a',
    status: 'active',
    createdAt: '2022-06-21T11:57:45.000Z',
    updatedAt: '2022-06-21T11:57:45.000Z',
  },
  {
    id: 2,
    name: 'Saifur Rahman',
    username: 'saifur2',
    email: 'saif@gmail.com',
    password: '$2b$10$B8ITRYIj6G0YekKzxUjit.XHXdUMIL9UQjgD4d51mkpyOpjH9bNfu',
    status: 'active',
    createdAt: '2022-06-21T11:57:52.000Z',
    updatedAt: '2022-06-21T11:57:52.000Z',
  },
];

describe('user controller testing', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('all condition check for get all user', () => {
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

    test('Get all users testing process', async () => {
      jest.spyOn(userService, 'getAllUser').mockReturnValue(myUsers);
      const mreq = httpMocks.createRequest({
        headers: {
          accept: 'application/json',
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const mystatus = 200;
      await userController.getAllUsers(mreq, mres, mnext);
      const mResData = mres._getJSONData();
      expect(userService.getAllUser).toHaveBeenCalledTimes(1);
      expect(userService.getAllUser).toHaveBeenCalledWith();
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(
        mreq,
        mres,
        myUsers,
        mystatus
      );
      expect(mres.statusCode).toBe(mystatus);
      expect(mResData).toEqual(myUsers);
    });

    test('if condition test for get all user', async () => {
      jest.spyOn(userService, 'getAllUser').mockReturnValue(null);
      const mreq = httpMocks.createRequest({
        headers: {
          accept: 'application/json',
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const myError = new AppError('No user found', 404);
      await userController.getAllUsers(mreq, mres, mnext);
      expect(userService.getAllUser).toHaveBeenCalledTimes(1);
      expect(userService.getAllUser).toHaveBeenCalledWith();
      expect(mnext).toHaveBeenCalledTimes(1);
      expect(mnext).toHaveBeenCalledWith(myError);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(0);
    });
  });

  describe('All condition testing for search user by id', () => {
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

    test('Search user by Id testing process', async () => {
      jest.spyOn(userService, 'searchById').mockReturnValue(myUsers[0]);
      const { id } = myUsers[0];
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
      await userController.searchUserById(mreq, mres, mnext);
      const mResData = mres._getJSONData();
      expect(userService.searchById).toHaveBeenCalledTimes(1);
      expect(userService.searchById).toHaveBeenCalledWith(searchingId);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(
        mreq,
        mres,
        myUsers[0],
        mystatus
      );
      expect(mres.statusCode).toBe(mystatus);
      expect(mResData).toBeTruthy();
    });

    test('if condition test for search user by id', async () => {
      jest.spyOn(userService, 'searchById').mockReturnValue(null);
      const { id } = myUsers[0];
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
      await userController.searchUserById(mreq, mres, mnext);
      const myError = new AppError('No user found with that ID', 404);
      expect(userService.searchById).toHaveBeenCalledTimes(1);
      expect(userService.searchById).toHaveBeenCalledWith(searchingId);
      expect(mnext).toHaveBeenCalledTimes(1);
      expect(mnext).toHaveBeenCalledWith(myError);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(0);
    });
  });

  describe('all condition check for update user', () => {
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

    test('Update blog by Id testing process', async () => {
      jest.spyOn(userService, 'updateUser').mockReturnValue(1);
      const { id, name, email, password } = myUsers[0];
      const searchingId = id;
      const info = { name, email, password };
      const mreq = httpMocks.createRequest({
        method: 'PUT',
        params: {
          id: id,
        },
        body: {
          name: info.name,
          email: info.email,
          password: info.password,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const mystatus = 200;
      await userController.updateUser(mreq, mres, mnext);
      const mResData = mres._getJSONData();
      expect(userService.updateUser).toHaveBeenCalledTimes(1);
      expect(userService.updateUser).toHaveBeenCalledWith(searchingId, info);
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

    test('if condition test for Update blog', async () => {
      jest.spyOn(userService, 'updateUser').mockReturnValue(0);
      const { id, name, email, password } = myUsers[0];
      const searchingId = id;
      const info = { name, email, password };
      const mreq = httpMocks.createRequest({
        method: 'PUT',
        params: {
          id: id,
        },
        body: {
          name: info.name,
          email: info.email,
          password: info.password,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      await userController.updateUser(mreq, mres, mnext);
      const myError = new AppError('Failed update process', 404);
      expect(userService.updateUser).toHaveBeenCalledTimes(1);
      expect(userService.updateUser).toHaveBeenCalledWith(searchingId, info);
      expect(mnext).toHaveBeenCalledTimes(1);
      expect(mnext).toHaveBeenCalledWith(myError);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(0);
    });
  });

  test('User Delete by id testing process', async () => {
    jest.spyOn(userService, 'deleteUser').mockReturnValue(myUsers[0]);
    const { id } = myUsers[0];
    const userId = id;
    const mreq = httpMocks.createRequest({
      method: 'DELETE',
      params: {
        id: id,
      },
    });
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    const mystatus = 204;
    await userController.deleteUser(mreq, mres, mnext);
    expect(userService.deleteUser).toHaveBeenCalledTimes(1);
    expect(userService.deleteUser).toHaveBeenCalledWith(userId);
    expect(mres.statusCode).toBe(mystatus);
  });
});
