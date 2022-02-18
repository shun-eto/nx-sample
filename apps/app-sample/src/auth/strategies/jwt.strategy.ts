import { JwtModuleOptions } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  userId: string;
}

export const jwtOptions: JwtModuleOptions = {
  secret: 'secretKey',
  signOptions: { expiresIn: '60s' },
};

/** JwtAuthGuard 後のリクエスト */
export class VerifiedRequest {
  user: { id: string };
}

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.secret,
    });
  }

  /** 内部的にjwtをデコードして、引数にpayloadを受け取れる */
  async validate(payload: JwtPayload): Promise<VerifiedRequest> {
    return { user: { id: payload.userId } };
  }
}
