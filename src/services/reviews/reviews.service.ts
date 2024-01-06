import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/models/review/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  async createOne(review: Partial<ReviewEntity>): Promise<ReviewEntity> {
    try {
      review.source = 'SITE';
      review.score = Number(
        (
          (review.score_curriculum +
            review.score_job_support +
            review.score_overall) /
          3
        ).toFixed(2),
      );

      const newReview = await this.reviewRepository.create(review);
      return await this.reviewRepository.save(newReview);
    } catch (error) {
      throw error;
    }
  }
}
