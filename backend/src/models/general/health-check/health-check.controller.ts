import { Controller, Get, Header, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from '../../../common/constants/public.constants';

@Controller('/_health')
export class HealthCheckController {
  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  health(): { status: string } {
    return { status: 'OK' };
  }
}
