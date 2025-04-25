import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CredentialsDto, LoginResponseDto } from './auth.dto';
import { IJwtPayload } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body(new ValidationPipe()) credentialsDto: CredentialsDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(credentialsDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  logout(@Request() req: { user: IJwtPayload }): Promise<any> {
    //return await req.logout();
    return Promise.resolve(req);
  }
}
