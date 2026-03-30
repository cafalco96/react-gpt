import * as path from 'path';
import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { orthographyUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase, translateUseCase, textToAudioUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
  });
  //Solo casos de uso 
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyUseCase(this.openai, {
      prompt: orthographyDto.prompt
    });
  }
  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { 
      prompt 
    });
  }
  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { 
      prompt 
    });
  }
  async translate({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, {
      prompt,
      lang
    }); 
  }
  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, {
      prompt,
      voice
    });
  }
  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(__dirname, '../../generated/audios', `${fileId}.mp3`);
    if (!fs.existsSync(filePath)) throw new NotFoundException(`Audio ${fileId} file not found`);
    return filePath;
  }
}
