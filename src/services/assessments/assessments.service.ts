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
      // Agregar el bootcampId a cada objeto de assessment
      const assessmentsWithBootcampId = assessments.map((assessment) => ({
        ...assessment,
        bootcamp_id: bootcampId,
      }));

      // Usar upsert para insertar o actualizar en función de los campos únicos
      await this.assessmentsRepository.upsert(assessmentsWithBootcampId, {
        conflictPaths: ['bootcamp_id', 'criteria_id', 'category_id', 'weight'],
        skipUpdateIfNoValuesChanged: true, // Opcional: evita actualizaciones innecesarias
      });

      // Confirmación de que los criterios fueron actualizados o insertados
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
