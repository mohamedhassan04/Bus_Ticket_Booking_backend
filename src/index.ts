import { AuthenticationModule } from './modules/auth/auth.module';
import { BookingModule } from './modules/booking/booking.module';
import { BusModule } from './modules/bus/bus.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ReviewModule } from './modules/review/review.module';
import { RouteModule } from './modules/route/route.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { UserModule } from './modules/user/user.module';

export const AllModules = [
  UserModule,
  AuthenticationModule,
  BusModule,
  BookingModule,
  ScheduleModule,
  RouteModule,
  ReviewModule,
  PaymentModule,
];
