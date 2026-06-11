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
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, EditUserDto, UpdatePasswordDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('@me')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.userId);
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
    return this.usersService.findAll(status, step, from);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('@me')
  updateProfile(@Body() updateReportDto: EditUserDto, @Request() req) {
    return this.usersService.update(req.user.userId, updateReportDto);
  }

  @Put('@me/password')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDTO, @Request() req) {
    return this.usersService.updatePassword(req.user.userId, updatePasswordDto);
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
