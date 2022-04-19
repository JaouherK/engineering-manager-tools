import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/configuration.module';
import { AppConfigService } from './config/app/configuration.service';
import { GeneralModule } from './models/general/general.module';
import { ReportsModule } from './models/reports/reports.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import helmet from 'helmet';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';
import { AuthenticationModule } from './authx/authentication/authentication.module';
import { UsersModule } from './models/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authx/authentication/jwt/jwt-auth.guard';
import { CompaniesModule } from './models/companies/companies.module';
import { TasksModule } from './models/tasks/tasks.module';
import { FeedbacksModule } from './models/feedbacks/feedbacks.module';

@Module({
  imports: [
    AppConfigModule,
    GeneralModule,
    ReportsModule,
    MysqlDatabaseProviderModule,
    AuthenticationModule,
    UsersModule,
    CompaniesModule,
    TasksModule,
    FeedbacksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet(), LoggerMiddleware).exclude('').forRoutes('*');
  }
}
