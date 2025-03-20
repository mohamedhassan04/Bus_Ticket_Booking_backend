import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/modules/booking/entities/booking.entity';
import { EmailService } from '../send-mail/mail.service';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Booking])],
  providers: [CronService, EmailService],
  exports: [CronService],
})
export class CronModule {}
