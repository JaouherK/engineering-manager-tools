import {
  Get,
  Put,
  Post,
  Body,
  Controller,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { ReportsService } from './reports.service';
import {
  extendedReportGroupsForSerializing,
  ReportEntity,
} from './serializers/report.serializer';
import { EntityBeingQueried } from '@crowdlinker/nestjs-commons/decorators/requests/entity-being-queried';
import { CreateReportDto, EditReportDto } from './dto/repot.dto';
@Controller('reports')
@SerializeOptions({
  groups: extendedReportGroupsForSerializing,
})
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async get(
    @EntityBeingQueried('report') report: ReportEntity,
  ): Promise<ReportEntity> {
    return report;
  }

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs: CreateReportDto): Promise<ReportEntity> {
    return await this.reportsService.create(inputs);
  }

  // @Put('/:id')
  // @UseInterceptors(ClassSerializerInterceptor)
  // async update(
  //   @EntityBeingQueried('report') report: ReportEntity,
  //   @Body() inputs: EditReportDto,
  // ): Promise<ReportEntity> {
  //   return await this.reportsService.update(report, inputs);
  // }
}
