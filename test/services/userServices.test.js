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

  test('Search user by ID', async () => {
    jest.spyOn(Users, 'findOne').mockReturnValue(dummyUsers[0]);
    const { id } = dummyUsers[0];
    const user = await userService.searchById(id);
    expect(Users.findOne).toHaveBeenCalledTimes(1);
    expect(Users.findOne).toHaveBeenCalledWith({
      where: { id },
    });
    expect(user).toBe(dummyUsers[0]);
  });

  test('Update user info', async () => {
    jest.spyOn(Users, 'update').mockReturnValue(1);
    const { id, name, username, email } = dummyUsers[0];
    const info = { name, username, email };
    const user = await userService.updateUser(id, info);
    expect(Users.update).toHaveBeenCalledTimes(1);
    expect(Users.update).toHaveBeenCalledWith(info, { where: { id } });
    expect(user).toBe(1);
  });

  test('User Delete', async () => {
    jest.spyOn(Users, 'destroy').mockReturnValue();
    const { id } = dummyUsers[0];
    const user = await userService.deleteUser(id);
    expect(Users.destroy).toHaveBeenCalledTimes(1);
    expect(Users.destroy).toHaveBeenCalledWith({ where: { id } });
    expect(user).toBe();
  });
});
