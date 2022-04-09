import { Global, Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';

@Global()
@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
