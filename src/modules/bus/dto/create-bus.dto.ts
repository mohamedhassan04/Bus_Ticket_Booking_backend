import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusDto {
  @ApiProperty({
    type: 'string',
    example: '7894 - 15',
  })
  @IsString()
  @IsNotEmpty()
  busNumber: string;

  @ApiProperty({
    type: 'string',
    example: 'AC',
  })
  @IsEnum(['AC', 'Non-AC', 'Sleeper'])
  @IsNotEmpty()
  busType: string;

  @ApiProperty({
    type: 'number',
    example: 0,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  totalSeats: number;

  @ApiProperty({
    type: 'string',
    example: 'Indigo',
  })
  @IsString()
  @IsNotEmpty()
  company: string;
}
