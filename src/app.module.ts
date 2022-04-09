import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/configuration.module';
import { AppConfigService } from './config/app/configuration.service';
import { HealthCheckModule } from './models/health-check/health-check.module';

@Module({
  imports: [AppConfigModule, HealthCheckModule],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
