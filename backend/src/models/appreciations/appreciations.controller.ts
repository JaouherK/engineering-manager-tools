import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AppreciationDto } from './dto/appreciation.dto';
import { AppreciationsService } from './appreciations.service';

@Controller('@me/appreciations')
export class AppreciationsController {
  constructor(private readonly appreciationsService: AppreciationsService) {}

  @Post()
  create(@Body() createAppreciationDto: AppreciationDto) {
    return this.appreciationsService.create(createAppreciationDto);
  }

  @Get('report/:reportId/:expectationId')
  findAll(
    @Param('reportId', new ParseUUIDPipe()) reportId: string,
    @Param('expectationId', new ParseUUIDPipe()) expectationId: string,
  ) {
    return this.appreciationsService.findAllByReportCareer(
      reportId,
      expectationId,
    );
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.appreciationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.appreciationsService.remove(id);
  }
}
