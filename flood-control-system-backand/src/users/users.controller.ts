import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.createUser(login, password);
    return { message: 'User created successfully', user };
  }
}
