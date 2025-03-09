import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/;

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'user',
  })
  @IsString()
  @MinLength(2, { message: 'username must have atleast 2 characters.' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail(
    { allow_display_name: true },
    { message: 'Please provide a valid Email.' },
  )
  email: string;

  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

  @ApiProperty({
    type: 'string',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEnum(['admin', 'user', 'operator'], {
    message: 'Please provide a valid role.',
  })
  role: string;

  @ApiProperty({
    type: 'string',
    example: '+216000000',
  })
  @IsNotEmpty()
  phoneNumber: string;
}
