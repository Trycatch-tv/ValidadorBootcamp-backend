import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { boolean } from 'joi';
import { BootcampsClient } from 'src/clients/bottcamps/bootcamps.client';
import { Roles } from 'src/decorators/user/roles.decorator';
import { UpdateManyAssessmentDto } from 'src/dtos/assessment/updateManyAssessment.dto';
import { Role } from 'src/enum/user/role.enum';
import { RoleGuard } from 'src/guards/user/role.guard';
import { AuthGuard } from 'src/guards/user/user.guard';
import { AssessmentEntity } from 'src/models/assessment/assessment.entity';
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

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Create new assessment',
    type: CreateOneAssessmentResponse,
  })
  // @ApiBody({ type: CreateOneAssessmentResponse })
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

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Create new assessment',
    type: CreateOneAssessmentResponse,
  })
  @ApiBody({ type: Array<CreateOneAssessmentResponse> })
  @Post('many/:bootcampId')
  async createMany(
    @Param('bootcampId', ParseUUIDPipe) bootcampId: string,
    @Body() createAssessmentDto: Partial<AssessmentEntity[]>,
    @Headers('Authorization') token: string,
  ): Promise<CreateManyAssessmentResponse> {
    try {
      // Almacenar el assessment
      await this.assessmentsService.createMany(bootcampId, createAssessmentDto);

      // BoocampClient: Obtener el score del bootcamp -> bootcamp_id
      let bootcampScoreAverage;
      try {
        bootcampScoreAverage = await this.bootcampsClient.getScoreAverage(
          bootcampId,
          token,
        );
      } catch (error) {
        throw new HttpException(
          'Error getting bootcamp score',
          HttpStatus.BAD_REQUEST,
        );
      }

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

  // @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  // @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get assessments by bootcamp id',
  })
  @Get('bootcamp/many/:bootcampId')
  async getAssessmentByBootcampId(
    @Param('bootcampId', ParseUUIDPipe) bootcampId: string,
  ): Promise<any> {
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

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
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
    @Headers('Authorization') token: string,
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
        await this.bootcampsClient.recalculateScoreAverage(bootcampId, token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
