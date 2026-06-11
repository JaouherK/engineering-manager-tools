import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReportSourcesService } from './report-sources.service';
import {
  CreateReportSourcesDto,
  UpdateReportSourcesDto,
} from './dto/report-sources.dto';
import { ReportSources } from './entities/report-sources.entity';

@Controller('@me/sources')
export class ReportSourcesController {
  constructor(private readonly reportSourcesService: ReportSourcesService) {}

  @Post()
  create(
    @Body() createReportSourceDto: CreateReportSourcesDto,
  ): Promise<ReportSources> {
    return this.reportSourcesService.create(createReportSourceDto);
  }

  @Get('/report/:reportId')
  findByReport(@Param('reportId') reportId: string): Promise<ReportSources[]> {
    return this.reportSourcesService.findByReport(reportId);
  }

  @Get('/:sourceId/report/:reportId')
  findSourceData(
    @Param('reportId', new ParseUUIDPipe()) reportId: string,
    @Param('sourceId', new ParseUUIDPipe()) sourceId: string,
  ) {
    // TODO: make a switcher if more integrations added
    return this.reportSourcesService.findStatistics(reportId, sourceId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateReportSourceDto: UpdateReportSourcesDto,
  ): Promise<ReportSources> {
    return this.reportSourcesService.update(id, updateReportSourceDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.reportSourcesService.remove(id);
  }
}
