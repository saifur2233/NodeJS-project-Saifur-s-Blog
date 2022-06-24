const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');
const signinService = require('../../services/signinService');
const Users = require('../../models/userModel');

const myUsers = [
  {
    username: 'saifur1',
    password: '$2b$10$ZNPG2viT21nCU26u.2D7.eSDX3P0yjE3Fda0/EjuuB51OPmMlTn9a',
  },
];
describe('User Sign in', () => {
  test('first if condition testing', async () => {
    jest.spyOn(Users, 'findOne').mockImplementation(myUsers[0]);
    const mreq = httpMocks.createRequest({
      body: {
        password: myUsers[0].password,
      },
    });
    const { username, password } = myUsers[0];
    const mres = httpMocks.createResponse();
    const mnext = jest.fn();
    await signinService.login(mreq, mres, mnext);
    //expect(mres).toHaveBeenCalledTimes(1);
    //expect({ username, password }).toHaveBeenCalledWith(password);
    expect(Users.findOne).toHaveBeenCalledTimes(0);
  });
  test('Sign in process testing', async () => {
    jest.spyOn(Users, 'findOne').mockImplementation((inputData) => {
      return inputData;
    });
    jest.spyOn(bcrypt, 'compare').mockImplementation((inputData, password) => {
      return inputData;
    });
    jest
      .spyOn(jwt, 'sign')
      .mockReturnValue(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaWZ1cjEiLCJpYXQiOjE2NTU4OTAwODksImV4cCI6MTY2MzY2NjA4OX0.stF4hbNyCFUQGS6MloWxyIfHRY3MKr4JpeVesYiLz_0'
      );

    const { username, password } = myUsers[0];
    const mytoken = await signinService.login(myUsers[0]);
    expect(Users.findOne).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(Users.findOne).toHaveBeenCalledWith({ where: { username } });
    expect(mytoken).toBeTruthy();
  });
});
