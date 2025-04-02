import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeminiCreateDto } from './dto/gemini-create.dto';
import { ScheduleService } from '../schedule/schedule.service';

const GEMINI_MODEL = 'gemini-1.5-flash';

@Injectable()
export class GeminiService {
  private readonly googleAI: GoogleGenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly _scheduleService: ScheduleService,
  ) {
    const geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error(
        'GEMINI_API_KEY is not defined in environment variables.',
      );
    }
    this.googleAI = new GoogleGenAI({ apiKey: geminiApiKey });
  }

  async generateContent(userQuery: string): Promise<{ result: string }> {
    const extractedRoute = this.extractRoute(userQuery);
    const extractedDate = this.extractDate(userQuery);

    if (!extractedRoute || !extractedDate) {
      return {
        result:
          'I could not understand the route or date. Please provide a valid format like: "Nabeul-Gabes on 2025-03-26".',
      };
    }

    // Fetch schedule from database
    const schedule = await this._scheduleService.getScheduleByRouteAndDate(
      extractedRoute,
      extractedDate,
    );

    if (!schedule) {
      return {
        result: `No buses found for route ${extractedRoute} on ${extractedDate}.`,
      };
    }

    // Create a dynamic prompt based on user input and schedule data
    const prompt = `User asked: "${userQuery}". Provide a helpful response based on this bus schedule:
  - Route: ${schedule.route}
  - Date: ${schedule.departureDate}
  - Departure Time: ${schedule.departureTime}
  - Arrival Time: ${schedule.arrivalTime}
  - fare: ${schedule.fare}`;

    // Send the dynamic prompt to Gemini AI
    const response = await this.googleAI.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction:
          'You are a smart assistant that helps users find bus schedules.',
      },
    });

    return { result: response.text };
  }

  private extractRoute(userMessage: string): string | null {
    const routeRegex = /(\b[A-Za-z]+-[A-Za-z]+\b)/; // Matches "Nabeul-Gabes"
    const match = userMessage.match(routeRegex);
    return match ? match[1] : null;
  }

  private extractDate(userMessage: string): string | null {
    const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/; // Matches "2025-03-26"
    const match = userMessage.match(dateRegex);
    return match ? match[0] : null;
  }
}
