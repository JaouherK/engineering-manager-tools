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
import { SalariesService } from './salaries.service';
import { CreateSalaryDto, EditSalaryDto } from './dto/salary.dto';

@Controller('@me/salaries')
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) {}

  @Post()
  create(@Body() createSalaryDto: CreateSalaryDto) {
    return this.salariesService
      .resetSalaries(createSalaryDto.reportId)
      .then((e) => {
        return this.salariesService.create(createSalaryDto);
      });
  }

  @Get('report/:id')
  findAll(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('status', new DefaultValuePipe(true), ParseBoolPipe)
    status: boolean,
    @Query('step', new DefaultValuePipe(10), ParseIntPipe) step: number,
    @Query('from', new DefaultValuePipe(0), ParseIntPipe) from: number,
    @Request() req,
  ) {
    return this.salariesService.findAllByReport(id, status, step, from);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.salariesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSalaryDto: EditSalaryDto,
  ) {
    return this.salariesService.update(id, updateSalaryDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.salariesService.remove(id);
  }
}
