import { Controller, Get, Header, HttpCode } from '@nestjs/common';

@Controller('/_health')
export class HealthCheckController {
  @Get()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  health(): { status: string } {
    return { status: 'OK' };
  }
}
