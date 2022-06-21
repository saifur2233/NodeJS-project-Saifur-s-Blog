require('iconv-lite').encodingExists('foo');
const userService = require('../../services/userServices');
const Users = require('../../models/userModel');

const dummyUsers = [
  {
    id: 1,
    name: 'Saifur Rahman',
    username: 'saifur1',
    email: 'saifur01@gmail.com',
    password: '$2b$10$dqu/LjCcOZE/WulmxdJkgemuTxpLMedhFF7rDgUGYjKvJfbMk3JtW',
    status: 'active',
    createdAt: '2022-06-16T02:14:18.000Z',
    updatedAt: '2022-06-16T05:20:48.000Z',
  },
  {
    id: 2,
    name: 'Saifur Rahman',
    username: 'saifur2',
    email: 'saifur02@gmail.com',
    password: '$2b$10$zbrvQfZyDZJQ49tYdgNKxeHVCj3ThvoGTUatK44Z6q5Czc4veXPrO',
    status: 'active',
    createdAt: '2022-06-16T02:14:26.000Z',
    updatedAt: '2022-06-17T08:42:21.000Z',
  },
  {
    id: 3,
    name: 'Saifur Rahman 3',
    username: 'saifur3',
    email: 'saif@gmail.com',
    password: '$2b$10$Tp762htO4RhKZOPcIwVz0OTLOPCBR701WxetFCFshjqC4yAnBcuTq',
    status: 'active',
    createdAt: '2022-06-16T02:14:34.000Z',
    updatedAt: '2022-06-16T02:14:34.000Z',
  },
];

describe('user service test', () => {
  test('Get all user', async () => {
    jest.spyOn(Users, 'findAll').mockReturnValue(dummyUsers);

    const val = await userService.getAllUser();
    expect(val).toBe(dummyUsers);
  });
});
