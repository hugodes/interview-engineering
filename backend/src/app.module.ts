import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenAiService } from './open-ai/open-ai.service';
import OpenAI from 'openai';
import { OpenAiEventsGateway } from './open-ai/open-ai.events.gateway';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, OpenAiService, OpenAiEventsGateway],
})
export class AppModule {}
