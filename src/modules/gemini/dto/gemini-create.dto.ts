import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GeminiCreateDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsString()
  @IsOptional()
  sessionId: string;
}
