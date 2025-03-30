import { Body, Controller, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiCreateDto } from './dto/gemini-create.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get('generate')
  async generateExample(
    @Body() geminiCreateDto: GeminiCreateDto,
  ): Promise<{ result: string }> {
    return await this.geminiService.generateContent(geminiCreateDto);
  }
}
