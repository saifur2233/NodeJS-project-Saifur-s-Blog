const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signinService = require('../../services/signinService');
const Users = require('../../models/userModel');

const dummyUsers = [
  {
    username: 'saifur1',
    password: '$2b$10$ZNPG2viT21nCU26u.2D7.eSDX3P0yjE3Fda0/EjuuB51OPmMlTn9a',
  },
];
describe('User Sign in', () => {
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

    const { username, password } = dummyUsers[0];
    const mytoken = await signinService.login(dummyUsers[0]);
    expect(Users.findOne).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(Users.findOne).toHaveBeenCalledWith({ where: { username } });

    expect(mytoken).toBeTruthy();
  });
});
