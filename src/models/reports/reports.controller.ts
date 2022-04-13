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
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto, EditReportDto } from './dto/repot.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll(
    @Query('status', new DefaultValuePipe(true), ParseBoolPipe)
    status: boolean,
    @Query('step', new DefaultValuePipe(10), ParseIntPipe) step: number,
    @Query('from', new DefaultValuePipe(0), ParseIntPipe) from: number,
  ) {
    // throw new ForbiddenException();
    console.log(status);
    console.log(step);
    console.log(from);
    return this.reportsService.findAll(status, step, from);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateReportDto: EditReportDto,
  ) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.reportsService.remove(id);
  }
}
