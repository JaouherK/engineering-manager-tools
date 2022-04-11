import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsRepository } from './reports.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReportsRepository])],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
