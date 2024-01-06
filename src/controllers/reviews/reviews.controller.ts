import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateOneReviewDto } from 'src/dtos/review/createOneReview.dto';
import { CreateOneReviewResponse } from 'src/responses/reviews/createOneReview.response';
import { ReviewsService } from 'src/services/reviews/reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBody({ type: CreateOneReviewDto })
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
    type: CreateOneReviewDto,
  })
  @Post()
  async createOne(
    @Body() createReviewDto: CreateOneReviewDto,
  ): Promise<CreateOneReviewResponse> {
    try {
      return await this.reviewsService.createOne(createReviewDto);
    } catch (error) {
      console.log(error.message);
      throw new HttpException('Error creating review', HttpStatus.BAD_REQUEST);
    }
  }
}
