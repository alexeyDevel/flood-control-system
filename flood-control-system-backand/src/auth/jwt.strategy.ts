import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TUser } from 'src/users/users.service';

const extractJwtAndLog = () => {
  return (req: Request): string | null => {
    let token: string | null = null;
    if (req && req.headers['authorization']) {
      token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    }
    return token;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: extractJwtAndLog(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY ?? 'secret',
    });
  }

  validate(payload: TUser) {
    return { userId: payload.userId, login: payload.login };
  }
}
