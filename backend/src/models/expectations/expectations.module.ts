import { Module } from '@nestjs/common';
import { ExpectationsService } from './expectations.service';
import { ExpectationsController } from './expectations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expectation } from './entities/expectation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expectation])],
  controllers: [ExpectationsController],
  providers: [ExpectationsService],
})
export class ExpectationsModule {}
