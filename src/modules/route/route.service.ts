import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route) private readonly _routeRepo: Repository<Route>,
  ) {}
  async create(createRouteDto: CreateRouteDto) {
    return await this._routeRepo.save(createRouteDto);
  }

  async findAll() {
    return await this._routeRepo.find();
  }
}
