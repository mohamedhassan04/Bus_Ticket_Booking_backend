import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Schedule } from '../schedule/entities/schedule.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly _bookingRepository: Repository<Booking>,

    @InjectRepository(Ticket)
    private readonly _ticketRepository: Repository<Ticket>,

    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,

    @InjectRepository(Schedule)
    private readonly _scheduleRepository: Repository<Schedule>,
  ) {}

  async createBooking(
    user: User,
    createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    const { scheduleId, tickets, status, amountPaid } = createBookingDto;

    // Validate Schedule
    const schedule = await this._scheduleRepository.findOne({
      where: { id: scheduleId },
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

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
