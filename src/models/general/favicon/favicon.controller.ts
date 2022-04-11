import { Controller, Get, Header, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/favicon.ico')
export class FaviconController {
  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Cache-Control', 'none')
  favicon(): { status: string } {
    return;
  }
}
