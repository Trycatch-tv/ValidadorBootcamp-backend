import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOneReviewDto } from 'src/dtos/review/createOneReview.dto';
import { CreateOneReviewResponse } from 'src/responses/reviews/createOneReview.response';
import { FindAllReviewsResponse } from 'src/responses/reviews/findAllReviews.response';
import { ReviewsService } from 'src/services/reviews/reviews.service';

@ApiTags('Reiews')
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
      throw new HttpException('Error creating review', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'List all reviews',
    type: FindAllReviewsResponse,
  })
  @Get('list')
  async findAll(): Promise<FindAllReviewsResponse[]> {
    try {
      return await this.reviewsService.findAll();
    } catch (error) {
      throw new HttpException('Error fetching reviews', HttpStatus.BAD_REQUEST);
    }
  }
}
