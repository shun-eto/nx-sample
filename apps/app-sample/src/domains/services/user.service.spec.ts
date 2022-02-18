import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User } from '../models/user.schema';
import { mockUser, userModelProvider } from '../models/user.schema.spec';
import { UserService } from './user.service';

export const userServiceProvider: Provider = {
  provide: UserService,
  useValue: {
    duplicate: jest.fn((user: User) => user.email === 'duplication@email.com'),
  },
};

describe('UserService', () => {
  let userModel: Model<User>;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [userModelProvider, userServiceProvider],
    }).compile();

    userModel = module.get<Model<User>>(getModelToken(User.name));
    userService = module.get(UserService);
  });

  test('should be defined', () => {
    expect(userModel).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('duplicate()', () => {
    test('true', () => {
      const user = new User(mockUser);
      user.email = 'duplication@email.com';
      expect(userService.duplicate(user)).toBeTruthy();
    });

    test('false', () => {
      const user = new User(mockUser);
      expect(userService.duplicate(user)).toBeFalsy();
    });
  });
});
