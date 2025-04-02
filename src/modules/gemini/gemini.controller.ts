import { Body, Controller, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get('generate')
  async generateExample(
    @Body('prompt') prompt: string,
  ): Promise<{ result: string }> {
    return await this.geminiService.generateContent(prompt);
  }
}
