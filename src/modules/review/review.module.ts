import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Bus } from '../bus/entities/bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Bus])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
