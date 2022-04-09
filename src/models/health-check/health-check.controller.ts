import { Controller, Get, Header, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/_health')
export class HealthCheckController {
  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  health(): { status: string } {
    return { status: 'OK' };
  }
}
