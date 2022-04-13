import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { MysqlConfigService } from '../../../config/databse/mysql/configuration.service';
import { MysqlConfigModule } from '../../../config/databse/mysql/configuration.module';
import { Language } from '../../../models/languages/entities/language.entity';
import { Report } from '../../../models/reports/entities/report.entity';
import { User } from '../../../models/users/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useFactory: async (mysqlConfigService: MysqlConfigService) => ({
        type: 'mysql' as DatabaseType,
        host: mysqlConfigService.host,
        port: mysqlConfigService.port,
        username: 'root',
        password: '',
        database: mysqlConfigService.database,
        entities: [Language, Report, User],
        synchronize: true,
      }),
      inject: [MysqlConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class MysqlDatabaseProviderModule {}
