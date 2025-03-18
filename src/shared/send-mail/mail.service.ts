import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { confirmAccountTemplate } from './templates/confirm-account.template';
import { resetPwdTemplate } from './templates/reset-pwd.template';

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
}
