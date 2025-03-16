import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Bus } from '../bus/entities/bus.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly _reviewRepository: Repository<Review>,
    @InjectRepository(Bus)
    private readonly _busRepo: Repository<Bus>,
  ) {}
  async createReview(createReviewDto: CreateReviewDto, user: User) {
    const { busId } = createReviewDto;

    // Check if bus exists
    const bus = await this._busRepo.findOne({ where: { id: busId } });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${busId} not found`);
    }

    await this._reviewRepository.save({
      ...createReviewDto,
      user,
      bus,
    });

    return { message: 'Review created successfully', HttpStatus: 201 };
  }

  async findAllReviewByBusId(busId: string) {
    const reviews = this._reviewRepository
      .createQueryBuilder('review')
      .leftJoin('review.user', 'user')
      .addSelect(['user.username'])
      .where('review.busId = :busId', { busId });

    const query = await reviews.getMany();

    return query;
  }

  async deleteReview(id: string) {
    const review = await this._reviewRepository.findOneBy({ id });

    if (!review) {
      throw new NotFoundException('Review not found');
    } else {
      await this._reviewRepository.remove(review);
    }
    return {
      message: 'Review deleted successfully',
      HttpStatus: 200,
    };
  }
}
