import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({ description: 'ID of the bus', example: 1 })
  @IsNotEmpty()
  busId: string;

  @ApiProperty({ description: 'ID of the route', example: 2 })
  @IsNotEmpty()
  routeId: string;

  @ApiProperty({
    description: 'Departure date (YYYY-MM-DD)',
    example: '2025-03-10',
  })
  @IsNotEmpty()
  @IsDateString()
  departureDate: string;

  @ApiProperty({
    description: 'Departure time (HH:MM:SS)',
    example: '08:00:00',
  })
  @IsNotEmpty()
  @IsString()
  departureTime: string;

  @ApiProperty({
    description: 'Arrival date (YYYY-MM-DD)',
    example: '2025-03-10',
  })
  @IsNotEmpty()
  arrivalDate: string;

  @ApiProperty({ description: 'Arrival time (HH:MM:SS)', example: '12:00:00' })
  @IsNotEmpty()
  @IsString()
  arrivalTime: string;

  @ApiProperty({
    description: 'Fare price of the ticket',
    type: Number,
    example: 25.5,
  })
  @IsNotEmpty()
  @IsNumber()
  fare: number;
}
