import { Injectable } from '@nestjs/common';
import { AzureOpenAIHelper } from 'src/common/helpers/integrations/azureOpenAI.helper';
import { LlmDto } from './dto/llm.dto';

@Injectable()
export class LlmService {

  private azureOpenAIHelper = new AzureOpenAIHelper('https://api.openai.azure.com', 'your-azure-openai-token');

  async getLLMResponse(request: string): Promise<string> {
    const response = await this.azureOpenAIHelper.getResponse('feedback', request);
    return response;
  }

  async getLLMSummary(data: any): Promise<string> {
    const response = await this.azureOpenAIHelper.getResponse('summary', data);
    return response;
  }
}
