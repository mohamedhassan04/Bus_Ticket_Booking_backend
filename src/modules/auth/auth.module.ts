import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthenticationService } from './auth.service';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { AuthenticationController } from './auth.controller';
import { AuthMiddleware } from 'src/exceptions/Auth-middelware';
import { EmailService } from 'src/shared/send-mail/mail.service';

/* If we import JwtModule, we don't need to import JwtService */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [
    AuthenticationService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    EmailService,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'user/users', method: RequestMethod.GET },
        { path: 'user/:id', method: RequestMethod.DELETE },
        { path: 'user/confirm-account', method: RequestMethod.PATCH },
        { path: 'user/reset-password', method: RequestMethod.POST },
        { path: 'user/send-reset', method: RequestMethod.POST },
        { path: 'route/all', method: RequestMethod.GET },
        { path: 'review/all', method: RequestMethod.GET },
        { path: 'ticket/verify', method: RequestMethod.POST },
        { path: 'gemini/generate', method: RequestMethod.GET },
      ) // Exclude specific paths or methods
      .forRoutes('*'); // Apply to all routes
  }
}
