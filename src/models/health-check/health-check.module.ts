import { Global, Module } from '@nestjs/common';
import { HealthCheckController } from './healthCheck.controller';

@Global()
@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
