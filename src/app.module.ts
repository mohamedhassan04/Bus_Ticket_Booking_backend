import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AllModules } from 'src';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot(configService.smtpEmailConfig()),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ...AllModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
