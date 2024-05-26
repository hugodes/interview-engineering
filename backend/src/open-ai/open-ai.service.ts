import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private readonly openAiClient: OpenAI;
  private readonly model: string;
  private readonly instructions: string;
  private readonly maxTokens: number;
  private readonly maxNumberOfChoices: number;

  constructor(private readonly configService: ConfigService) {
    const openaiApiKey = this.configService.get<string>('OPEN_AI_API_KEY');
    const openaiModelVersion = this.configService.get<string>(
      'OPEN_AI_MODEL_VERSION',
    );
    const openaiClientID = this.configService.get<string>('OPEN_AI_CLIENT_ID');
    if (!openaiApiKey || !openaiModelVersion || !openaiClientID) {
      throw new Error(
        'OPEN_AI_API_KEY or OPEN_AI_MODEL_VERSION is not defined',
      );
    }

    this.openAiClient = new OpenAI({
      apiKey: openaiApiKey,
    });
    this.model = openaiModelVersion;
    this.maxTokens = 1000;
    this.maxNumberOfChoices = 1;
  }

  async chat(question: string, openaiClientID: string) {
    const aiResponse: OpenAI.ChatCompletion =
      await this.openAiClient.chat.completions.create({
        user: openaiClientID,
        model: this.model,
        messages: [{ role: 'user', content: question }],
        ...(this.maxTokens ? { max_tokens: this.maxTokens } : {}),
        ...(this.maxNumberOfChoices ? { n: this.maxNumberOfChoices } : {}),
      });

    return aiResponse;
  }
}
