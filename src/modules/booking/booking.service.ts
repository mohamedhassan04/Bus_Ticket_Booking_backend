import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { EmailService } from 'src/shared/send-mail/mail.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly _bookingRepository: Repository<Booking>,

    @InjectRepository(Ticket)
    private readonly _ticketRepository: Repository<Ticket>,

    @InjectRepository(Schedule)
    private readonly _scheduleRepository: Repository<Schedule>,

    private readonly _emailService: EmailService,
  ) {}

  async createBooking(
    user: User,
    createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    const { scheduleId, tickets, status, amountPaid } = createBookingDto;

    // Validate Schedule
    const schedule = await this._scheduleRepository.findOne({
      where: { id: scheduleId },
      relations: ['route'],
    });
    if (!schedule) throw new NotFoundException('Schedule not found');

    // Create Booking
    const booking = this._bookingRepository.create({
      user,
      schedule,
      status,
      amountPaid,
    });
    await this._bookingRepository.save(booking);

    // Create Tickets
    const ticketEntities = tickets.map((ticket) => {
      return this._ticketRepository.create({
        seatNumber: ticket.seatNumber,
        passengerName: ticket.passengerName,
        booking,
      });
    });

    await this._ticketRepository.save(ticketEntities);

    // Booked Tickets Array
    const bookedTickets = await Promise.all(
      tickets.map(async (ticket) => ticket.seatNumber),
    );

    // Send Email
    await this._emailService.sendEmailConfirmBooking(
      user.email,
      user.username,
      schedule?.route?.startLocation,
      schedule?.route?.endLocation,
      schedule?.departureDate,
      schedule?.departureTime,
      bookedTickets.join(', '),
      booking?.bookingReference,
    );

    throw new HttpException(
      { message: 'Booking successfully created!' },
      HttpStatus.CREATED,
    );
  }

  async findAllBookings(user: User) {
    return await this._bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.tickets', 'ticket')
      .leftJoinAndSelect('booking.schedule', 'schedule')
      .where('booking.userId = :userId', { userId: user.id })
      .orderBy('booking.createdAt', 'DESC')
      .getMany();
  }
}
