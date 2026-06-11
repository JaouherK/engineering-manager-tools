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
import { ExpectationsService } from './expectations.service';
import {
  CreateExpectationDto,
  EditExpectationDto,
} from './dto/expectation.dto';

@Controller('@me/expectations')
export class ExpectationsController {
  constructor(private readonly expectationsService: ExpectationsService) {}

  @Post()
  create(@Body() createExpectationDto: CreateExpectationDto) {
    return this.expectationsService.create(createExpectationDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.expectationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateExpectationDto: EditExpectationDto,
  ) {
    return this.expectationsService.update(id, updateExpectationDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.expectationsService.remove(id);
  }
}
