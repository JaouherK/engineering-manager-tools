import { Controller, Post, Body } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmDto } from './dto/llm.dto';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post()
  getLLMResponse(@Body() llmDto: LlmDto) {
    return this.llmService.getLLMResponse(llmDto.initialFeedback);
  }
  
  @Post('summary')
  getLLMSummary(@Body() data: any) {
    return this.llmService.getLLMSummary(data);
  }
}
