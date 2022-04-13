import { Controller, Get, Header, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from '../../../common/constants/public.constants';

@Controller('/favicon.ico')
export class FaviconController {
  @Public()
  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Cache-Control', 'none')
  favicon(): { status: string } {
    return;
  }
}
