import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { ConfigService } from '@nestjs/config';
import { ScheduleService } from '../schedule/schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
import { Bus } from '../bus/entities/bus.entity';
import { Route } from '../route/entities/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Bus, Route])],
  controllers: [GeminiController],
  providers: [GeminiService, ConfigService, ScheduleService],
})
export class GeminiModule {}
