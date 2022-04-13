import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, EditUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  create(@Body() createReportDto: CreateUserDto) {
    return this.usersService.create(createReportDto);
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
    return this.usersService.findAll(status, step, from);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateReportDto: EditUserDto,
  ) {
    return this.usersService.update(id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
