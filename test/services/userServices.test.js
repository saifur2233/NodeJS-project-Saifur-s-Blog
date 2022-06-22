const userService = require('../../services/userServices');
const Users = require('../../models/userModel');

const dummyUsers = [
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

describe('user service test', () => {
  test('Get all user', async () => {
    jest.spyOn(Users, 'findAll').mockReturnValue(dummyUsers);
    const allUsers = await userService.getAllUser();
    expect(allUsers).toBe(dummyUsers);
  });

  // test('Search user by ID', async (userId) => {
  //   jest.spyOn(Users, 'findOne').mockReturnValue(dummyUsers);
  //   const user = await userService.searchById();
  //   expect(user).toBe(dummyUsers);
  // });
});
