import { Controller, Get, Header, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from '../../../common/constants/public.constants';

@Controller('/robots.txt')
export class RobotsController {
  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'text/plain')
  robots(): string {
    return 'User-agent: *\nDisallow: /';
  }
}
