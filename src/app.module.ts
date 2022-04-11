import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/configuration.module';
import { AppConfigService } from './config/app/configuration.service';
import { GeneralModule } from './models/general/general.module';
import { ReportsModule } from './models/reports/reports.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import helmet from 'helmet';

@Module({
  imports: [AppConfigModule, GeneralModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet(), LoggerMiddleware).exclude('').forRoutes('*');
  }
}
