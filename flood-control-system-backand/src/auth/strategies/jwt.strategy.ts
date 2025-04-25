import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/users/users.schema';

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
      secretOrKey: process.env.FCS_JWT_KEY ?? 'test-secret-key',
    });
  }

  validate(payload: { id: string; login: string }) {
    return { userId: payload.id, login: payload.login };
  }
}
