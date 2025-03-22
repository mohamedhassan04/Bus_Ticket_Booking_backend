import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Booking } from 'src/modules/booking/entities/booking.entity';
import { Between, Repository } from 'typeorm';
import { EmailService } from '../send-mail/mail.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @InjectRepository(Booking)
    private readonly _bookingRepository: Repository<Booking>,

    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async sendBookingReminders() {
    const findSchedule = await this._bookingRepository.find({
      relations: ['schedule', 'tickets'],
      where: {
        schedule: {
          departureDate: moment().format('YYYY-MM-DD'),
          departureTime: Between(
            moment().format('HH:mm'),
            moment().add(1, 'hour').format('HH:mm'),
          ),
        },
      },
    });

    const upcomingBookings = findSchedule.flatMap(
      (element: any) =>
        element?.tickets.map((ticket: any) => ticket.passengerEmail) || [],
    );

    if (upcomingBookings.length === 0) {
      this.logger.log('No upcoming bookings found.');
      return;
    }

    upcomingBookings.forEach(async (email: string) => {
      // await this.emailService.sendEmailConfirmAccount(email, '');
    });
  }
}
