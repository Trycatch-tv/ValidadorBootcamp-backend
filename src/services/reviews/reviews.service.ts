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

  async findAll(): Promise<ReviewEntity[]> {
    try {
      return await this.reviewRepository.find({
        where: { is_active: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async getScoreAverage(bootcampId: string): Promise<number> {
    try {
      const reviews = await this.reviewRepository.find({
        where: { bootcamp_id: bootcampId, is_active: true },
      });
      if (reviews.length === 0) {
        return 0;
      }
      const scoreAverage =
        reviews.reduce((acc, review) => acc + review.score, 0) / reviews.length;
      return Number(scoreAverage.toFixed(2));
    } catch (error) {
      throw error;
    }
  }

  async findAllByBootcampId(bootcampId: string): Promise<ReviewEntity[]> {
    try {
      return await this.reviewRepository.find({
        where: { bootcamp_id: bootcampId, is_active: true },
      });
    } catch (error) {
      throw error;
    }
  }
}
