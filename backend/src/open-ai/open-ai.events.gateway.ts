import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAiService } from './open-ai.service';
import * as WebSocket from 'ws';

@Injectable()
export class OpenAiEventsGateway implements OnModuleInit, OnModuleDestroy {
  private wss: WebSocket.Server;

  constructor(
    private readonly openAiService: OpenAiService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.wss = new WebSocket.Server({ port: 3002 });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client connected');

      ws.on('message', async (message: string) => {
        const { type, question } = JSON.parse(message);

        if (type === 'startChat') {
          const openaiClientID = this.configService.get<string>('OPEN_AI_CLIENT_ID');
          const completion = this.openAiService.chatStream(question, openaiClientID);

          for await (const chunk of completion) {
            ws.send(chunk);
          }
        }
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });

    console.log('WebSocket server initialized on port 3002');
  }

  onModuleDestroy() {
    this.wss.close();
  }
}