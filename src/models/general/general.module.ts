import { Global, Module } from '@nestjs/common';
import { FaviconController } from './favicon/favicon.controller';
import { HealthCheckController } from './health-check/health-check.controller';
import { RobotsController } from './robots/robots.controller';

@Global()
@Module({
  controllers: [FaviconController, HealthCheckController, RobotsController],
})
export class GeneralModule {}
