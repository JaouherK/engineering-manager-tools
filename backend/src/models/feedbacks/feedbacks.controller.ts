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
    @Query('expectationId') expectationId: string,
    @Query('step', new DefaultValuePipe(100), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Request() req,
    @Query('from') fromDate?: string,
    @Query('to') toDate?: string,
  
  ) {
    return this.feedbacksService.findAllByReport(
      req.user.userId,
      id,               // reportId
      expectationId,
      take,
      skip,
      fromDate,
      toDate,
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
