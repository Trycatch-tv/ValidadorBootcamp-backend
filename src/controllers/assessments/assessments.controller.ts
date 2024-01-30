import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAssessmentDto } from 'src/dtos/assessment/createOneAssessment.dto';
import { CreateOneAssessmentResponse } from 'src/responses/assessments/createAssessment.response';
import { AssessmentsService } from 'src/services/assessments/assessments.service';

@ApiTags('Assessments')
@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @ApiResponse({
    status: 200,
    description: 'Create new assessment',
    type: CreateOneAssessmentResponse,
  })
  @ApiBody({ type: CreateAssessmentDto })
  @Post()
  async createOne(
    @Body() createAssessmentDto: CreateAssessmentDto,
  ): Promise<CreateOneAssessmentResponse> {
    try {
      return this.assessmentsService.createOne(createAssessmentDto);
    } catch (error) {
      throw new HttpException(
        'Error creating assessment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
