import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthExceptionFilter } from 'src/exceptions/FilterException';

@ApiTags('Route')
@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  //@Method POST
  //@desc Create Route
  //@Path: /create
  @ApiOperation({ summary: 'Create Route' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success Create Route.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Create Route.',
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
  async create(@Body() createRouteDto: CreateRouteDto) {
    return await this.routeService.create(createRouteDto);
  }

  //@Method GET
  //@desc Get all Route
  //@Path: /all
  @ApiOperation({ summary: 'Get all Route' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success Get all Route.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get all Route.',
  })
  @Get('/all')
  async findAll() {
    return await this.routeService.findAll();
  }
}
