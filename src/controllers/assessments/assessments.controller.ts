import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { boolean } from 'joi';
import { BootcampsClient } from 'src/clients/bottcamps/bootcamps.client';
import { CreateOneAssessmentDto } from 'src/dtos/assessment/createOneAssessment.dto';
import { UpdateManyAssessmentDto } from 'src/dtos/assessment/updateManyAssessment.dto';
import { CreateOneAssessmentResponse } from 'src/responses/assessments/createAssessment.response';
import CreateManyAssessmentResponse from 'src/responses/assessments/createManyAssessment.response';
import { AssessmentsService } from 'src/services/assessments/assessments.service';

@ApiTags('Assessments')
@Controller('assessments')
export class AssessmentsController {
  constructor(
    private readonly assessmentsService: AssessmentsService,
    private readonly bootcampsClient: BootcampsClient,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Create new assessment',
    type: CreateOneAssessmentResponse,
  })
  @ApiBody({ type: CreateOneAssessmentResponse })
  @Post()
  async createOne(
    @Body() createAssessmentDto: CreateOneAssessmentResponse,
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

  @ApiResponse({
    status: 200,
    description: 'Create new assessment',
    type: CreateOneAssessmentResponse,
  })
  @ApiBody({ type: CreateOneAssessmentResponse })
  @Post('many/:bootcampId')
  async createMany(
    @Param('bootcampId', ParseUUIDPipe) bootcampId: string,
    @Body() createAssessmentDto: CreateOneAssessmentDto[],
  ): Promise<CreateManyAssessmentResponse> {
    try {
      // Almacenar el assessment
      await this.assessmentsService.createMany(bootcampId, createAssessmentDto);
      // BoocampClient: Obtener el score del bootcamp -> bootcamp_id
      const bootcampScoreAverage =
        await this.bootcampsClient.getScoreAverage(bootcampId);

      // BoocampClient: Actualizar el score del bootcamp -> bootcamp_id
      return await this.bootcampsClient.updateScore(
        bootcampId,
        bootcampScoreAverage,
      );
    } catch (error) {
      throw new HttpException(
        'Error creating assessment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Get assessment by bootcamp id',
  })
  @Get('bootcamp/:bootcampId')
  async getAssessmentByBootcampId(bootcampId: string): Promise<any> {
    try {
      return await this.assessmentsService.getAssessmentByBootcampId(
        bootcampId,
      );
    } catch (error) {
      throw new HttpException(
        'Error getting assessment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBody({ type: UpdateManyAssessmentDto })
  @ApiResponse({
    status: 200,
    description: 'Update many assessments by bootcamp id',
    type: boolean,
  })
  @Put('bootcamp/many/:id')
  async updateManyByBootcampId(
    @Param('id', ParseUUIDPipe) bootcampId: string,
    @Body() assessments: UpdateManyAssessmentDto[],
  ): Promise<boolean> {
    try {
      // Obtener la respuesta de la actualización de los assessments del services
      const isAllAssessmentUpdated =
        await this.assessmentsService.updateManyByBootcampId(
          bootcampId,
          assessments,
        );
      // Si la respuesta es verdadera recalcular el score del bootcamp
      if (isAllAssessmentUpdated) {
        await this.bootcampsClient.recalculateScoreAverage(bootcampId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
