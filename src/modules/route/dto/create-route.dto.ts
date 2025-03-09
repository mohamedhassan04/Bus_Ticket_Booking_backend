import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRouteDto {
  @ApiProperty({
    type: 'string',
    example: 'Gabés',
  })
  @IsString()
  @IsNotEmpty()
  startLocation: string;

  @ApiProperty({
    type: 'string',
    example: 'Tunis',
  })
  @IsString()
  @IsNotEmpty()
  endLocation: string;

  @ApiProperty({
    type: 'float',
    example: 400.5,
  })
  @IsNumber()
  @IsNotEmpty()
  distance: number;
}
