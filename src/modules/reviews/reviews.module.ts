import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from 'src/controllers/reviews/reviews.controller';
import { ReviewEntity } from 'src/models/review/review.entity';
import { ReviewsService } from 'src/services/reviews/reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [TypeOrmModule],
})
export class ReviewsModule {}
