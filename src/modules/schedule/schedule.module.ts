import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Bus } from '../bus/entities/bus.entity';
import { Route } from '../route/entities/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Bus, Route])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
