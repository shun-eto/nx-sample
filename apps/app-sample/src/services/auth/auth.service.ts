import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from '../../auth/strategies/jwt.strategy';
import { User, UserDocument } from '../../domains/models/user.schema';

@Injectable()
export class AuthService {
  /** @todo Inject User Model */
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}

  /** SignIn時のUseGuardで利用
   * ユーザーの有無のチェック
   * パスワードの整合性をチェック
   */
  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ name: username });

    if (!user) throw new HttpException('Not Found User', HttpStatus.NOT_FOUND);

    const authorized = await user.authenticate(password);
    if (!authorized)
      throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);

    return true;
  }

  /** SignIn時にアクセストークンを発行する */
  async signIn(userId: string): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { userId };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken: accessToken };
  }
}
