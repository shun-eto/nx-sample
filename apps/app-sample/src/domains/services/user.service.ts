import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * email と local.activatedAt が 存在した場合、activeなユーザーと判断する
   */
  async duplicate(user: User, option?: { delete?: boolean }): Promise<boolean> {
    const foundUser = await this.userModel.findOne({ email: user.email });

    if (foundUser && option.delete)
      await this.userModel.deleteOne({ email: user.email });

    return Boolean(foundUser) && Boolean(foundUser?.local?.activatedAt);
  }
}
