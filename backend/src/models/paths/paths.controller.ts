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
import { PathsService } from './paths.service';
import { CreatePathDto, EditPathDto } from './dto/path.dto';

@Controller('@me/paths')
export class PathsController {
  constructor(private readonly pathsService: PathsService) {}

  @Post()
  create(@Body() createPathDto: CreatePathDto, @Request() req) {
    return this.pathsService.create(req.user.userId, createPathDto);
  }

  @Get('company/:id')
  findAll(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('status', new DefaultValuePipe(true), ParseBoolPipe)
    status: boolean,
    @Query('step', new DefaultValuePipe(10), ParseIntPipe) step: number,
    @Query('from', new DefaultValuePipe(0), ParseIntPipe) from: number,
    @Request() req,
  ) {
    return this.pathsService.findAll(req.user.userId, id, status, step, from);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.pathsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePathDto: EditPathDto,
    @Request() req,
  ) {
    return this.pathsService.update(req.user.userId, id, updatePathDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
    return this.pathsService.remove(req.user.userId, id);
  }
}
