import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  private openAiClient: OpenAI;
  private model: string;
  private maxTokens: number;
  private maxNumberOfChoices: number;

  constructor(private readonly configService: ConfigService) {
    const openaiApiKey = this.configService.get<string>('OPEN_AI_API_KEY');
    const openaiModelVersion = this.configService.get<string>('OPEN_AI_MODEL_VERSION');
    const openaiClientID = this.configService.get<string>('OPEN_AI_CLIENT_ID');
    if (!openaiApiKey || !openaiModelVersion || !openaiClientID) {
      throw new Error('OPEN_AI_API_KEY or OPEN_AI_MODEL_VERSION or OPEN_AI_CLIENT_ID is not defined');
    }

    this.openAiClient = new OpenAI({ apiKey: openaiApiKey });
    this.model = openaiModelVersion;
    this.maxTokens = 1000;
    this.maxNumberOfChoices = 1;
  }

  async *chatStream(question: string, openaiClientID: string): AsyncIterable<string> {
    const aiResponse = await this.openAiClient.chat.completions.create({
      user: openaiClientID,
      model: this.model,
      messages: [{ role: 'user', content: question }],
      ...(this.maxTokens ? { max_tokens: this.maxTokens } : {}),
      ...(this.maxNumberOfChoices ? { n: this.maxNumberOfChoices } : {}),
      stream: true,
    });

    for await (const chunk of aiResponse) {
      yield chunk.choices[0].delta.content;
    }
  }
}
