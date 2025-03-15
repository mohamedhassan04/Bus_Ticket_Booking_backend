import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
  IsUUID,
  Min,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class TicketDTO {
  @ApiProperty({ example: 'A1', description: 'Seat number for the ticket' })
  @IsString()
  seatNumber: string;

  @ApiProperty({ example: 'John Doe', description: 'Passenger name' })
  @IsNotEmpty()
  passengerName: string;
}

export class CreateBookingDto {
  @ApiProperty({
    example: '660e8400-e29b-41d4-a716-446655440111',
    description: 'Schedule ID (UUID)',
  })
  @IsUUID()
  scheduleId: string;

  @ApiProperty({
    type: [TicketDTO],
    description: 'List of tickets with seat number and passenger name',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDTO)
  tickets: TicketDTO[];

  @ApiProperty({
    example: 'pending',
    enum: ['pending', 'confirmed', 'cancelled'],
    description: 'Status of the booking',
  })
  @IsEnum(['pending', 'confirmed', 'cancelled'])
  status: string;

  @ApiProperty({
    example: 50.0,
    description: 'Total amount paid for the booking',
  })
  @IsNumber()
  @Min(0)
  amountPaid: number;
}
