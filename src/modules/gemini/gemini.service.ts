import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeminiCreateDto } from './dto/gemini-create.dto';

const GEMINI_MODEL = 'gemini-1.5-flash';

@Injectable()
export class GeminiService {
  private readonly googleAI: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error(
        'GEMINI_API_KEY is not defined in environment variables.',
      );
    }
    this.googleAI = new GoogleGenAI({ apiKey: geminiApiKey });
  }

  async generateContent(
    geminiCreateDto: GeminiCreateDto,
  ): Promise<{ result: string }> {
    try {
      const response = await this.googleAI.models.generateContent({
        model: GEMINI_MODEL,
        contents: geminiCreateDto.prompt,
        config: {
          systemInstruction: 'You are an expert assistant.',
        },
      });
      return {
        result: response.text,
      };
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }
}
