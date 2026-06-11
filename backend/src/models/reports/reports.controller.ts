import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseBoolPipe,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto, EditReportDto } from './dto/repot.dto';

@Controller('@me/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto, @Request() req) {
    return this.reportsService.create(req.user.userId, createReportDto);
  }

  @Get()
  findAll(
    @Query('status', new DefaultValuePipe(true), ParseBoolPipe)
    status: boolean,
    @Query('situation', new DefaultValuePipe('active')) situation: string,
    @Query('step', new DefaultValuePipe(15), ParseIntPipe) step: number,
    @Query('from', new DefaultValuePipe(0), ParseIntPipe) from: number,
    @Request() req,
  ) {
    return this.reportsService.findAll(
      req.user.userId,
      status,
      situation,
      step,
      from,
    );
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
    return this.reportsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateReportDto: EditReportDto,
    @Request() req,
  ) {
    return this.reportsService.update(req.user.userId, id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
    return this.reportsService.remove(req.user.userId, id);
  }
}
