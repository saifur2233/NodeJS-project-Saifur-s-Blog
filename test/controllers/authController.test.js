const httpMocks = require('node-mocks-http');
const signupService = require('../../services/signupService');
const signinService = require('../../services/signinService');
const authController = require('../../controllers/authController');
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

describe('Authentication Controller Testing Process', () => {
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

  describe('Sign up process testing', () => {
    test('sign up testing', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaWZ1cjEiLCJpYXQiOjE2NTU4OTAwODksImV4cCI6MTY2MzY2NjA4OX0.stF4hbNyCFUQGS6MloWxyIfHRY3MKr4JpeVesYiLz_0';
      jest.spyOn(signupService, 'registration').mockReturnValue(token);
      const { name, username, email, password, status } = myUsers[0];
      const info = { name, username, email, password, status };
      const mreq = httpMocks.createRequest({
        method: 'POST',
        body: {
          name: info.name,
          username: info.username,
          email: info.email,
          password: info.password,
          status: info.status,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const mystatus = 201;
      await authController.signUp(mreq, mres, mnext);
      const mResData = mres._getJSONData();
      expect(signupService.registration).toHaveBeenCalledTimes(1);
      expect(signupService.registration).toHaveBeenCalledWith(info);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledWith(
        mreq,
        mres,
        token,
        mystatus
      );
      expect(mres.statusCode).toBe(mystatus);
      expect(mResData).toEqual(token);
    });

    test('sign up if condition testing', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaWZ1cjEiLCJpYXQiOjE2NTU4OTAwODksImV4cCI6MTY2MzY2NjA4OX0.stF4hbNyCFUQGS6MloWxyIfHRY3MKr4JpeVesYiLz_0';
      jest.spyOn(signupService, 'registration').mockReturnValue(null);
      const { name, username, email, password, status } = myUsers[0];
      const info = { name, username, email, password, status };
      const mreq = httpMocks.createRequest({
        method: 'POST',
        body: {
          name: info.name,
          username: info.username,
          email: info.email,
          password: info.password,
          status: info.status,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const mystatus = 201;
      await authController.signUp(mreq, mres, mnext);
      const myError = new AppError('User sign up failed', 401);
      expect(signupService.registration).toHaveBeenCalledTimes(1);
      expect(signupService.registration).toHaveBeenCalledWith(info);
      expect(mnext).toHaveBeenCalledTimes(1);
      expect(mnext).toHaveBeenCalledWith(myError);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(0);
    });
  });

  describe('Sign in process testing', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('Sign in test', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaWZ1cjEiLCJpYXQiOjE2NTU4OTAwODksImV4cCI6MTY2MzY2NjA4OX0.stF4hbNyCFUQGS6MloWxyIfHRY3MKr4JpeVesYiLz_0';
      jest.spyOn(signinService, 'login').mockReturnValue(token);
      const { username, password } = myUsers[0];
      const info = { username, password };
      const mreq = httpMocks.createRequest({
        method: 'POST',
        body: {
          username: info.username,
          password: info.password,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const mystatus = 200;
      await authController.signIn(mreq, mres, mnext);
      const mResData = mres._getJSONData();
      expect(signinService.login).toHaveBeenCalledTimes(1);
      expect(signinService.login).toHaveBeenCalledWith(info);
      expect(mres.statusCode).toBe(mystatus);
      expect(mResData).toEqual({
        message: 'Login Successfull',
        'access token': token,
      });
    });

    test('Sign in if condition testing', async () => {
      jest.spyOn(signinService, 'login').mockReturnValue(null);
      const { username, password } = myUsers[0];
      const info = { username, password };
      const mreq = httpMocks.createRequest({
        method: 'POST',
        body: {
          username: info.username,
          password: info.password,
        },
      });
      const mres = httpMocks.createResponse();
      const mnext = jest.fn();
      const myError = new AppError('Unauthorized Access', 401);
      await authController.signIn(mreq, mres, mnext);
      expect(signinService.login).toHaveBeenCalledTimes(1);
      expect(signinService.login).toHaveBeenCalledWith(info);
      expect(mnext).toHaveBeenCalledTimes(1);
      expect(mnext).toHaveBeenCalledWith(myError);
    });
  });
});
