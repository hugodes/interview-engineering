import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OpenAiService } from './open-ai/open-ai.service';

interface ChatInput {
  question: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly openAIservice: OpenAiService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  getHealth(): string {
    return 'OK';
  }

  @Post('/chat')
  async postChat(param: ChatInput): Promise<string> {
    // Validation param here
    const chatCompletion = await this.openAIservice.chat(param.question, '123');
    return chatCompletion.choices[0].message.content || 'No response';
  }
}
