import { AzureOpenAI } from "openai";

export class AzureOpenAIHelper {
  source: string;
  token: string;

  constructor(source: string, token: string) {
    this.source = source;
    this.token = token;
    if (!source) {
      throw Error('[AzureOpenAI] Please provide the Azure OpenAI URL');
    }
    if (!token) {
      throw Error('[AzureOpenAI] Please provide an AZURE_OPENAI_TOKEN');
    }
  }


  generatePrompt(type: string, data: any): string {
    switch (type) {
      case 'feedback':
        return `Your role is a feedback curator that generates output in HTML format not markdown. no outhershell or header is needed. only the output content of the body tag. rework the following feedback and make it concise and clear: \n\n ${data}`;
      case 'summary':
        const { appreciations, name, description, expectations } = data.content;
        const appreciationsText = appreciations.map(app => `${app.viewValue} (${app.value})`).join(', ');
        const expectationsText = expectations.map(exp => `${exp.note}: ${exp.feedback}`).join('\n');
        return `Your role is to generate a summary for the following feedback to provide appraisal feedback. Use the appreciations as reference for values and go through the expectations and associated notes and feedback. The expected outcome is a summary of what was done right followed by a list of growth areas identified by a change of note in my feedback later provide an extensive areas of improvement based on the feedbacks in bullet points. The response should be exclusively in HTML, not in markdown. No title is needed and no reminder of position and associated description. \n\n Appreciations: ${appreciationsText} \n\n Position: ${name} \n\n Expectations from position: ${description} \n\n Feedback to Person: ${expectationsText}`;
      default:
        throw new Error('Invalid prompt type');
    }
  }

  async getResponse(type: string, data: any): Promise<any> {
    const deployment = "Your deployment name";
    const apiVersion = "2024-10-21";
    const client = new AzureOpenAI({
      deployment: "gpt-4o",
      apiVersion: "2024-08-01-preview",
      apiKey: "24819da4f24c4d0dbda3f87469944897",
      endpoint: "https://openai-llm-models-sweden.openai.azure.com/"
    });

    const prompt = this.generatePrompt(type, data);

    let response = await client.chat.completions.create(
      {
        model: "gpt-4o",
        max_tokens: 1000,
        temperature: 0.0,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }
    );

    let usage = response.usage;
    const responseMessage = response.choices[0].message;

    return {
            id: response.id,
            response: {
                role: responseMessage.role,
                content: responseMessage.content ?? '',
            },
            usage: {
                completionTokens: usage?.completion_tokens ?? 0,
                promptTokens: usage?.prompt_tokens ?? 0,
                totalTokens: usage?.total_tokens ?? 0
            }
        };

  }
}
