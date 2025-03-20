import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthExceptionFilter } from 'src/exceptions/FilterException';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entities/user.entity';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  //@Method POST
  //@desc Create Booking
  //@Path: /create
  @ApiOperation({ summary: 'Create Booking' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success Create Booking.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Create Booking.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Authentication required.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient permissions.',
  })
  @UseGuards(JwtAuthGuard)
  @UseFilters(AuthExceptionFilter)
  @Post('/create')
  async createBooking(
    @GetUser() user: User,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return await this.bookingService.createBooking(user, createBookingDto);
  }

  //@Method GET
  //@desc All Booking
  //@Path: /all
  @ApiOperation({ summary: 'All Booking' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success All Booking.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error All Booking.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Authentication required.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient permissions.',
  })
  @UseGuards(JwtAuthGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('/all')
  async findAll(@GetUser() user: User) {
    return await this.bookingService.findAllBookings(user);
  }
}
