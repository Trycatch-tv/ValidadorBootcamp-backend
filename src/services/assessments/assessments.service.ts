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

  async createMany(
    bootcampId: string,
    assessments: Partial<AssessmentEntity>[],
  ): Promise<{ createdCriteria: number; avoidedCriteria: number }> {
    try {
      let createdCriteria = 0;
      let avoidedCriteria = 0;
      assessments.forEach(async (assessment) => {
        const criteriaExists = this.assessmentsRepository.exist({
          where: {
            bootcamp_id: bootcampId,
            criteria_id: assessment.criteria_id,
          },
        });
        assessment.bootcamp_id = bootcampId;
        if (criteriaExists) {
          const newAssessment =
            await this.assessmentsRepository.create(assessment);
          await this.assessmentsRepository.save(newAssessment);
          createdCriteria++;
        } else {
          avoidedCriteria++;
        }
      });
      return {
        createdCriteria,
        avoidedCriteria,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAssessmentByBootcampId(
    bootcampId: string,
  ): Promise<AssessmentEntity[]> {
    try {
      return await this.assessmentsRepository.find({
        where: {
          bootcamp_id: bootcampId,
          is_active: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateManyByBootcampId(
    bootcampId: string,
    assessments: Partial<AssessmentEntity>[],
  ): Promise<boolean> {
    try {
      // Recorrer los assessments y actualizarlos
      assessments.forEach(async (assessment) => {
        await this.assessmentsRepository.update(
          {
            bootcamp_id: bootcampId,
            criteria_id: assessment.criteria_id,
            category_id: assessment.category_id,
          },
          assessment,
        );
      });
      // Devolver la confirmaicón de que los criterios fueron actualizados
      return true;
    } catch (error) {
      return false;
    }
  }
}
