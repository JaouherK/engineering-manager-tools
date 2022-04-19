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
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto, EditFeedbackDto } from './dto/feedback.dto';

@Controller('@me/feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto, @Request() req) {
    return this.feedbacksService.create(req.user.userId, createFeedbackDto);
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
    return this.feedbacksService.findAllByReport(
      req.user.userId,
      id,
      status,
      step,
      from,
    );
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
    return this.feedbacksService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateFeedbackDto: EditFeedbackDto,
    @Request() req,
  ) {
    return this.feedbacksService.update(req.user.userId, id, updateFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
    return this.feedbacksService.remove(req.user.userId, id);
  }
}
