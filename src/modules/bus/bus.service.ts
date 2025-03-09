import { Injectable } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusService {
  constructor(
    @InjectRepository(Bus) private readonly _busRepo: Repository<Bus>,
  ) {}
  async create(createBusDto: CreateBusDto) {
    return await this._busRepo.save(createBusDto);
  }

  async findAll() {
    return await this._busRepo.find();
  }

  async update(id: string, updateBusDto: UpdateBusDto) {
    return await this._busRepo.update(id, updateBusDto);
  }

  async remove(id: string) {
    return await this._busRepo.delete(id);
  }
}
