import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssessmentEntity } from 'src/models/assessment/assessment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(AssessmentEntity)
    private readonly assessmentsRepository: Repository<AssessmentEntity>,
  ) {}

  async createOne(
    assessment: Partial<AssessmentEntity>,
  ): Promise<AssessmentEntity> {
    try {
      const newAssessment = await this.assessmentsRepository.create(assessment);
      return await this.assessmentsRepository.save(newAssessment);
    } catch (error) {
      throw error;
    }
  }
}
