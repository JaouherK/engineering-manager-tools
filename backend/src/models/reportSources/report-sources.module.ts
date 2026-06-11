import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportSources } from './entities/report-sources.entity';
import { ReportSourcesController } from './report-sources.controller';
import { ReportSourcesService } from './report-sources.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportSources])],
  controllers: [ReportSourcesController],
  providers: [ReportSourcesService],
})
export class ReportSourcesModule {}
