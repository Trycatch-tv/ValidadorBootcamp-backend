import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewsClient } from 'src/clients/reviews/reviews.client';
import { AssessmentEntity } from 'src/models/assessment/assessment.entity';
import { BootcampEntity } from 'src/models/bootcamp/bootcamp.entity';
import EvaluationCriteriaWeigths from 'src/utils/data/bootcamp/EvaluationCriteriaWeigths';
import { ILike, Not, Repository } from 'typeorm';
// import CriteriosEvaluacion from '../../utils/data/bootcamp/criterios-evaluacion.json';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectRepository(BootcampEntity)
    private bootcampRepository: Repository<BootcampEntity>,
    private readonly reviewsClient: ReviewsClient,
  ) {}

  async findAll(): Promise<BootcampEntity[]> {
    try {
      const bootcamps = (
        await this.bootcampRepository.find({
          where: { is_active: true },
        })
      ).map((bootcamp) => {
        return bootcamp;
      });

      return bootcamps;
    } catch (error) {
      throw error;
    }
  }

  async createOne(bootcamp: Partial<BootcampEntity>): Promise<BootcampEntity> {
    const newBootcamp = this.bootcampRepository.create(bootcamp);
    return await this.bootcampRepository.save(newBootcamp);
  }

  async findOne(id: string): Promise<BootcampEntity> {
    try {
      const bootcamp = await this.bootcampRepository.findOne({
        where: { id, is_active: true },
      });
      if (!bootcamp) throw new Error('Bootcamp not found');
      return bootcamp;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(
    id: string,
    bootcamp: Partial<BootcampEntity>,
  ): Promise<BootcampEntity> {
    try {
      const bootcampFound = await this.bootcampRepository.findOneOrFail({
        where: { id, is_active: true },
      });
      const updatedBootcamp = await this.bootcampRepository.save({
        ...bootcampFound,
        ...bootcamp,
      });
      return updatedBootcamp;
    } catch (error) {
      throw error;
    }
  }

  async search(key: string): Promise<BootcampEntity[]> {
    try {
      const bootcamps = await this.bootcampRepository.find({
        where: [
          { name: ILike(`%${key}%`), is_active: true },
          { description: ILike(`%${key}%`), is_active: true },
          { email: ILike(`%${key}%`), is_active: true },
          { country_name: ILike(`%${key}%`), is_active: true },
          { mode: ILike(`%${key}%`), is_active: true },
        ],
      });
      if (!bootcamps.length) throw new Error('Bootcamp not found');
      return bootcamps;
    } catch (error) {
      throw error;
    }
  }
  async removeOne(id: string): Promise<BootcampEntity> {
    try {
      const user = await this.bootcampRepository.findOneOrFail({
        where: { id, is_active: true },
      });
      user.is_active = false;
      return await this.bootcampRepository.save(user);
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async uploadAvatar(
    bootcampId: string,
    avatarUUID: string,
  ): Promise<BootcampEntity | any> {
    try {
      const bootcamp = await this.bootcampRepository.findOneOrFail({
        where: { id: bootcampId, is_active: true },
      });
      bootcamp.avatar = avatarUUID;
      return await this.bootcampRepository.save(bootcamp);
    } catch (error) {
      throw error;
    }
  }

  async findOneAvatar(id: string): Promise<BootcampEntity> {
    try {
      return await this.bootcampRepository.findOneOrFail({
        where: { id, is_active: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const bootcamp = await this.bootcampRepository.findOneOrFail({
        where: { id, is_active: true },
      });
      return !!bootcamp;
    } catch (error) {
      return false;
    }
  }

  async uploadTermsAndConditions(
    bootcampId: string,
    termsAndConditionsUUID: string,
  ): Promise<BootcampEntity | any> {
    try {
      const bootcamp = await this.bootcampRepository.findOneOrFail({
        where: { id: bootcampId, is_active: true },
      });
      bootcamp.terms_and_conditions = termsAndConditionsUUID;
      return await this.bootcampRepository.save(bootcamp);
    } catch (error) {
      throw error;
    }
  }

  async findOneTermsAndConditions(id: string): Promise<BootcampEntity> {
    try {
      return await this.bootcampRepository.findOneOrFail({
        where: { id, is_active: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateScore(
    bootcampId: string,
    score: number,
  ): Promise<BootcampEntity> {
    try {
      const bootcamp = await this.bootcampRepository.findOneOrFail({
        where: { id: bootcampId, is_active: true },
      });
      bootcamp.score = score;
      return await this.bootcampRepository.save(bootcamp);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllByScore(): Promise<BootcampEntity[]> {
    try {
      const bootcamps = await this.bootcampRepository.find({
        where: { is_active: true, score: Not(0.0) },
        order: { score: 'DESC' },
      });
      return bootcamps;
    } catch (error) {
      throw error;
    }
  }

  async getScoreAverage(
    bootcampId: string,
    assessments: AssessmentEntity[],
  ): Promise<BootcampEntity> {
    try {
      // Validar que exista el bootcamp
      const bootcamp = await this.bootcampRepository.findOneOrFail({
        where: { id: bootcampId, is_active: true },
      });
      // Consultar score de las reviews
      const getReviewScoreAverage = Math.ceil(
        await this.reviewsClient.getScoreAverage(bootcamp.id),
      );
      // TODO: Consultar evaluación del bootcamp utilizando el client -> crear el modelo evaluación y todos lo demás -> crear el client
      // Creamos un objeto de evaluación fake para testear.
      // const fakeScore = [
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 1,
      //     criteria_code: 'RV01',
      //     criteria_id: 1,
      //     weight: 4,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 1,
      //     criteria_code: 'RV02',
      //     criteria_id: 2,
      //     weight: 2,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 1,
      //     criteria_code: 'RV03',
      //     criteria_id: 3,
      //     weight: 3,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 1,
      //     criteria_code: 'RV04',
      //     criteria_id: 4,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 2,
      //     criteria_code: 'EF01',
      //     criteria_id: 1,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 2,
      //     criteria_code: 'EF02',
      //     criteria_id: 2,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 2,
      //     criteria_code: 'EF03',
      //     criteria_id: 3,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 2,
      //     criteria_code: 'EF04',
      //     criteria_id: 4,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 2,
      //     criteria_code: 'EF05',
      //     criteria_id: 5,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 2,
      //     criteria_code: 'EF06',
      //     criteria_id: 6,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 2,
      //     criteria_code: 'EF07',
      //     criteria_id: 7,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 2,
      //     criteria_code: 'EF08',
      //     criteria_id: 8,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 2,
      //     criteria_code: 'EF09',
      //     criteria_id: 9,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 2,
      //     criteria_code: 'EF10',
      //     criteria_id: 10,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 3,
      //     criteria_code: 'CF01',
      //     criteria_id: 1,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 3,
      //     criteria_code: 'CF02',
      //     criteria_id: 2,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 3,
      //     criteria_code: 'CF03',
      //     criteria_id: 3,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 3,
      //     criteria_code: 'CF04',
      //     criteria_id: 4,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 3,
      //     criteria_code: 'CF05',
      //     criteria_id: 5,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 3,
      //     criteria_code: 'CF06',
      //     criteria_id: 6,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 3,
      //     criteria_code: 'CF07',
      //     criteria_id: 7,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 3,
      //     criteria_code: 'CF08',
      //     criteria_id: 8,
      //     weight: 5,
      //   },
      //   {
      //     bootcamp_id: bootcamp.id,
      //     category_id: 3,
      //     criteria_code: 'CF09',
      //     criteria_id: 9,
      //     weight: 5,
      //   },
      // ];
      const realScore = assessments;
      // Consultar criterios de evaluación
      const assessment = realScore.map((criteria) => {
        // Identificar la categoría
        const getCategory = EvaluationCriteriaWeigths.find(
          (category) => category.id === criteria.category_id,
        );
        // Identificar el valor del criterio
        const getCriteriaWeight = getCategory.criteriaParams.find(
          (criteriaWeight) => criteriaWeight.id === criteria.criteria_id,
        );
        const criteriaWeight = getCriteriaWeight.weight;
        // Calcular el score = peso del criterio evaluado * valor del criterio
        const score = criteria.weight * criteriaWeight;

        const finalScores = {
          category_id: getCategory.id,
          category: getCategory.category,
          criteria_id: getCriteriaWeight.id,
          criteria: getCriteriaWeight.label,
          weightEvaluated: criteria.weight,
          weight: criteriaWeight,
          score: score,
        };
        return {
          finalScores,
        };
      });

      const sumResultadosVerificados = assessment.reduce((acc, criteria) => {
        if (criteria.finalScores.category_id === 1) {
          return acc + criteria.finalScores.score;
        }
        return acc;
      }, 0);
      const scoreTotalResultadosVerificados =
        (sumResultadosVerificados / 100) * EvaluationCriteriaWeigths[0].weight;

      const sumExperienciaFormativa = assessment.reduce((acc, criteria) => {
        if (criteria.finalScores.category_id === 2) {
          return acc + criteria.finalScores.score;
        }
        return acc;
      }, 0);

      const scoreTotalExperienciaFormativa =
        (sumExperienciaFormativa / 100) * EvaluationCriteriaWeigths[1].weight;

      const sumConfianza = assessment.reduce((acc, criteria) => {
        if (criteria.finalScores.category_id === 3) {
          return acc + criteria.finalScores.score;
        }
        return acc;
      }, 0);

      const scoreTotalConfianza =
        (sumConfianza / 100) * EvaluationCriteriaWeigths[2].weight;

      const scoreTotalPuntajeReviews =
        getReviewScoreAverage * EvaluationCriteriaWeigths[3].weight;

      // Calcular el score total
      const scoreTotal =
        scoreTotalResultadosVerificados +
        scoreTotalExperienciaFormativa +
        scoreTotalConfianza +
        scoreTotalPuntajeReviews;

      // Actualizar score del bootcamp (Sin almacenarlo en la base de datos)
      bootcamp.score = scoreTotal;
      return bootcamp;
    } catch (error) {
      throw error;
    }
  }

  async recalculateScoreAverage(
    bootcampId: string,
    assessments: AssessmentEntity[],
  ): Promise<BootcampEntity> {
    try {
      // Calcular el score promedio
      const getScoreAverageResponse = await this.getScoreAverage(
        bootcampId,
        assessments,
      );
      // Actualizar el score del bootcamp
      return await this.updateScore(bootcampId, getScoreAverageResponse.score);
    } catch (error) {
      throw error;
    }
  }
}
