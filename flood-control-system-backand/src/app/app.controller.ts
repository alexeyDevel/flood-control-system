import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { StartDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async start(@Body() start: StartDto): Promise<string> {
    return await this.appService.start(start);
  }
}
