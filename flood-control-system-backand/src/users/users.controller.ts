import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtUser } from 'src/auth/jwt-user.type';
import { User } from 'src/auth/decorators/user.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Post('getUser')
  async getUser(@User() user: JwtUser) {
    const res = await this.usersService.findUserById(user.userId);
    if (!res) throw new Error('User not found');

    return res;
  }
}
