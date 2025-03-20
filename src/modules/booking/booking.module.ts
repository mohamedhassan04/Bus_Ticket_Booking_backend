import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { User } from '../user/entities/user.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { EmailService } from 'src/shared/send-mail/mail.service';
import { CronService } from 'src/shared/cron/cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Ticket, User, Schedule])],
  controllers: [BookingController],
  providers: [BookingService, EmailService, CronService],
})
export class BookingModule {}
