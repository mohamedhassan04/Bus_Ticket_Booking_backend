import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'ID of the bus being rated',
    example: '8a1e8400-e29b-41d4-a716-446655440111',
    type: 'string',
  })
  @IsUUID()
  busId: string;

  @ApiProperty({
    description: 'Rating value (1-5 stars)',
    minimum: 1,
    maximum: 5,
    example: 5,
    type: 'number',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Optional comment for the rating',
    example: 'Great bus service!',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
