import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { Bus } from '../bus/entities/bus.entity';
import { Route } from '../route/entities/route.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly _scheduleRepo: Repository<Schedule>,
    @InjectRepository(Bus)
    private readonly _busRepo: Repository<Bus>,
    @InjectRepository(Route) private readonly _routeRepo: Repository<Route>,
  ) {}
  async create(createScheduleDto: CreateScheduleDto) {
    const { busId, routeId } = createScheduleDto;

    // Check if bus exists
    const bus = await this._busRepo.findOne({ where: { id: busId } });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${busId} not found`);
    }

    // Check if route exists
    const route = await this._routeRepo.findOne({ where: { id: routeId } });
    if (!route) {
      throw new NotFoundException(`Route with ID ${routeId} not found`);
    }

    await this._scheduleRepo.save({
      ...createScheduleDto,
      bus,
      route,
    });

    return {
      message: 'Schedule created successfully',
      HttpStatus: 201,
    };
  }

  async findAll() {
    return await this._scheduleRepo
      .createQueryBuilder('schedule')
      .leftJoin('schedule.bus', 'bus')
      .leftJoin('schedule.route', 'route')
      .addSelect(['bus.busNumber', 'bus.busType', 'route.distance'])
      .getMany();
  }
}
