import {
  Controller,
  Get,
  Request,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './authx/authentication/local/local-auth.guard';
import { AuthenticationService } from './authx/authentication/authentication.service';
import { Public } from './common/constants/public.constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthenticationService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getHello(): string {
    return this.appService.getHello();
  }
}
