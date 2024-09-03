import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/user/roles.decorator';
import { CreateOneReviewDto } from 'src/dtos/review/createOneReview.dto';
import { Role } from 'src/enum/user/role.enum';
import { RoleGuard } from 'src/guards/user/role.guard';
import { AuthGuard } from 'src/guards/user/user.guard';
import { CreateOneReviewResponse } from 'src/responses/reviews/createOneReview.response';
import { FindAllReviewsResponse } from 'src/responses/reviews/findAllReviews.response';
import { ReviewsService } from 'src/services/reviews/reviews.service';

@ApiTags('Reiews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.User)
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

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
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

  // TODO: El despliegue de este servicio debe ser privado, y adicionalmente contar con
  // un mecanismo de autenticación para comunicarse con los otros servicios.
  @ApiResponse({
    status: 200,
    description: 'Get score average by bootcamp id',
    type: Number,
  })
  @Get('bootcamp/:id/average')
  async getScoreAverage(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<number> {
    try {
      return await this.reviewsService.getScoreAverage(id);
    } catch (error) {
      throw new HttpException('Error fetching reviews', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('bootcamp/list/:id')
  async findAllByBootcampId(
    @Param('id', ParseUUIDPipe) bootcampId: string,
  ): Promise<FindAllReviewsResponse[]> {
    try {
      return await this.reviewsService.findAllByBootcampId(bootcampId);
    } catch (error) {
      throw new HttpException('Error fetching reviews', HttpStatus.BAD_REQUEST);
    }
  }
}
