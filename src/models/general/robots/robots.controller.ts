import { Controller, Get, Header, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/robots.txt')
export class RobotsController {
  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'text/plain')
  robots(): string {
    return 'User-agent: *\nDisallow: /';
  }
}
