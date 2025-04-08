import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './services/app.service';
import { StartDto } from './app.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Post('start')
  async start(@Body() start: StartDto): Promise<{ message: string }> {
    return await this.appService.start(start);
  }
}
