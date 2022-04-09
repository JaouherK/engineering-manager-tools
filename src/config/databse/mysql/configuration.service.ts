import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class MysqlConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('db.host');
  }
  get port(): number {
    return Number(this.configService.get<number>('db.port'));
  }
  get database(): string {
    return this.configService.get<string>('db.database');
  }
  get username(): number {
    return Number(this.configService.get<number>('db.username'));
  }

  get password(): string {
    return this.configService.get<string>('db.password');
  }
}
