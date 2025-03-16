import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //@Method POST
  //@desc Create Review
  //@Path: /create
  @ApiOperation({ summary: 'Create Review' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success Create Review.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Create Review.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Authentication required.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient permissions.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ) {
    return await this.reviewService.createReview(createReviewDto, user);
  }

  //@Method GET
  //@desc Get All Review
  //@Path: /all
  @ApiOperation({ summary: 'Get All Review' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success Get All Review.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get All Review.',
  })
  @Get('/all')
  async findAllReview(@Body('busId') busId: string) {
    return await this.reviewService.findAllReviewByBusId(busId);
  }

  //@Method DELETE
  //@desc Delete Review
  //@Path: /:id
  @ApiOperation({ summary: 'Delete Review' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success Delete Review.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Delete Review.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Authentication required.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient permissions.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return await this.reviewService.deleteReview(id);
  }
}
