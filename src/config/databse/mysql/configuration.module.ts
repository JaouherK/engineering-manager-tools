import { Module } from '@nestjs/common';
import configuration from './configuration';
import { MysqlConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('joi');

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DB_HOST: Joi.string().default('127.0.0.1'),
        DB_PORT: Joi.number().default(3306),
        DB_NAME: Joi.string().default('em_db'),
        DB_USER: Joi.string().default('em_db'),
        DB_PASS: Joi.string().default('password'),
      }),
    }),
  ],
  providers: [ConfigService, MysqlConfigService],
  exports: [ConfigService, MysqlConfigService],
})
export class MysqlConfigModule {}
