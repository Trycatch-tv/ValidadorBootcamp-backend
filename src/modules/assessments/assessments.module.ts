import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentsController } from 'src/controllers/assessments/assessments.controller';
import { AssessmentEntity } from 'src/models/assessment/assessment.entity';
import { AssessmentsService } from 'src/services/assessments/assessments.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssessmentEntity])],
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
})
export class AssessmentsModule {}
