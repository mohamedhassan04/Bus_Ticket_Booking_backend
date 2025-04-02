import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  UseFilters,
  Query,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthExceptionFilter } from 'src/exceptions/FilterException';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  //@Method POST
  //@desc Create Schedule
  //@Path: /create
  @ApiOperation({ summary: 'Create Schedule' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success Create Schedule.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Create Schedule.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Authentication required.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient permissions.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseFilters(AuthExceptionFilter)
  @Post('/create')
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    return await this.scheduleService.create(createScheduleDto);
  }

  //@Method GET
  //@desc Get all Schedule
  //@Path: /all
  @ApiOperation({ summary: 'Get all Schedule' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success Get all Schedule.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get all Schedule.',
  })
  @Get('/all')
  async findAll() {
    return await this.scheduleService.findAll();
  }

  //@Method GET
  //@desc Get all Schedule
  //@Path: /all
  @ApiOperation({ summary: 'Get all Schedule' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success Get all Schedule.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get all Schedule.',
  })
  @Get('/route-date')
  async getScheduleByRouteAndDate(
    @Query('routeId') routeId: string,
    @Query('date') date: string,
  ) {
    return await this.scheduleService.getScheduleByRouteAndDate(routeId, date);
  }
}
