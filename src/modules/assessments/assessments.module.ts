import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BootcampsClient } from 'src/clients/bottcamps/bootcamps.client';
import { AssessmentsController } from 'src/controllers/assessments/assessments.controller';
import { AssessmentEntity } from 'src/models/assessment/assessment.entity';
import { AssessmentsService } from 'src/services/assessments/assessments.service';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([AssessmentEntity])],
  controllers: [AssessmentsController],
  providers: [AssessmentsService, BootcampsClient, EnvironmentConfigService],
})
export class AssessmentsModule {}
