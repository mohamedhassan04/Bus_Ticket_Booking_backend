import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Bus')
@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  //@Method POST
  //@desc Create Bus
  //@Path: /create
  @ApiOperation({ summary: 'Create Bus' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success Create Bus.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Create Bus.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('/create')
  async create(@Body() createBusDto: CreateBusDto) {
    return await this.busService.create(createBusDto);
  }

  //@Method GET
  //@desc Get All Bus
  //@Path: /all
  @ApiOperation({ summary: 'Get All Bus' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success Get All Bus.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get All Bus.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/all')
  async findAll() {
    return await this.busService.findAll();
  }

  //@Method PATCH
  //@desc Update Bus
  //@Path: /:id
  @ApiOperation({ summary: 'Update Bus' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success Update Bus.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Update Bus.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return this.busService.update(id, updateBusDto);
  }

  //@Method DELETE
  //@desc Delete Bus
  //@Path: /:id
  @ApiOperation({ summary: 'Delete Bus' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success Delete Bus.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Delete Bus.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busService.remove(id);
  }
}
