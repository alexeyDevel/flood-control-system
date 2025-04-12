import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginResponseDto } from './auth.dto';
import { IJwtPayload, ILoginCredentials } from './auth.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.usersService.findUserByLogin(login);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password, ' = ', password, isMatch);
    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }
    return { login: user.login, _id: user._id as string };
  }

  async login(user: ILoginCredentials): Promise<LoginResponseDto> {
    const findedUser = await this.validateUser(user.login, user.password);
    const payload: IJwtPayload = { login: user.login, id: findedUser._id }; // Customize
    const access_token = this.jwtService.sign(payload);

    const loginResponse: LoginResponseDto = {
      access_token: access_token,
      expires_in: 3600,
      token_type: 'bearer',
    };
    return Promise.resolve(loginResponse);
  }
}
