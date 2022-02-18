import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';

/** SignIinAuthGuard 後のリクエスト */
export class ValidatedRequest {
  user: { id: string };
}

@Injectable()
export class SignInStrategy extends PassportStrategy(Strategy, 'sign-in') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string
  ): Promise<ValidatedRequest> {
    await this.authService.validateUser(username, password);

    return {
      user: { id: username },
    };
  }
}
