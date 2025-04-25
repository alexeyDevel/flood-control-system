import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './services/app.service';
import { StartDto } from './app.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { JwtUser } from 'src/auth/jwt-user.type';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Post('optimize')
  async optimize(
    @Body() start: StartDto,
    @User() user: JwtUser, // Теперь здесь строгая типизация
  ): Promise<{ message: string; pid: number }> {
    return await this.appService.optimize({ ...start, userId: user.userId }); // передаём типизированного пользователя
  }
}
