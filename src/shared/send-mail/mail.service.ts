import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { confirmAccountTemplate } from './templates/confirm-account.template';
import { resetPwdTemplate } from './templates/reset-pwd.template';
import { confirmBooking } from './templates/confirm-booking.template';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailConfirmAccount(email: string, confirmationLink: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Confirm Your Account - Bus Booking',
        html: confirmAccountTemplate(confirmationLink),
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }

  async sendEmailResetPassword(email: string, resetpwdlink: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Reset Password - Bus Booking',
        html: resetPwdTemplate(resetpwdlink),
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }

  async sendEmailConfirmBooking(
    email: string,
    username: string,
    bookingDate: string,
    departureTime: string,
    departure: string,
    destination: string,
    seatNumber: string,
    bookingReference: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Confirm Booking - Bus Booking',
        html: confirmBooking(
          username,
          departure,
          destination,
          bookingDate,
          departureTime,
          seatNumber,
          bookingReference,
        ),
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
