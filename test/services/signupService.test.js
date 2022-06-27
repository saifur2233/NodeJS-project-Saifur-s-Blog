const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signupService = require('../../services/signupService');
const Users = require('../../models/userModel');
const myUsers = [
  {
    name: 'Saifur Rahman',
    username: 'saifur1',
    email: 'saif@gmail.com',
    password: '$2b$10$ZNPG2viT21nCU26u.2D7.eSDX3P0yjE3Fda0/EjuuB51OPmMlTn9a',
    status: 'active',
  },
];

describe('User Sign Up', () => {
  test('Sign up', async () => {
    jest.spyOn(Users, 'create').mockImplementation((inputData) => {
      return inputData;
    });
    jest.spyOn(bcrypt, 'hash').mockImplementation((inputData, number) => {
      return inputData;
    });
    jest
      .spyOn(jwt, 'sign')
      .mockReturnValue(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaWZ1cjEiLCJpYXQiOjE2NTU4OTAwODksImV4cCI6MTY2MzY2NjA4OX0.stF4hbNyCFUQGS6MloWxyIfHRY3MKr4JpeVesYiLz_0'
      );
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaWZ1cjEiLCJpYXQiOjE2NTU4OTAwODksImV4cCI6MTY2MzY2NjA4OX0.stF4hbNyCFUQGS6MloWxyIfHRY3MKr4JpeVesYiLz_0';

    const user = await signupService.registration(myUsers[0]);
    expect(Users.create).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(Users.create).toHaveBeenCalledWith(myUsers[0]);
    expect(bcrypt.hash).toHaveBeenCalledWith(myUsers[0].password, 10);
    expect(user).toEqual(token);
  });
});
