import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';

export const mockUser = new User({
  name: 'mock-name',
  email: 'mock@email.com',
  local: {
    name: 'mock-name',
    password: 'crypt-password',
  },
});

export const userModelProvider: Provider = {
  provide: getModelToken(User.name),
  useValue: {
    new: jest.fn().mockResolvedValue({}),
    constructor: jest.fn().mockResolvedValue({}),
    find: jest.fn(),
    findOne: jest.fn(),
    /** @todo うまいことmodel固有のメソッドをmock */
    create: jest.fn().mockResolvedValue({
      ...mockUser,
      toObject: () => {
        return {};
      },
    }),
    exec: jest.fn(),
  },
};

describe('User', () => {
  const user = new User(mockUser);

  test('signUp', async () => {
    const url = await user.getSignUpUrl('test-password');
    expect(url).toBeDefined();
    expect(user.local.password !== 'crypt-password').toBeTruthy();
    expect(user.local.activateToken).toBeDefined();
  });
});
