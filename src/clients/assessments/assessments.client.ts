import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AssessmentEntity } from 'src/models/assessment/assessment.entity';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';

@Injectable()
export class AssessmentsClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async getAssessmentByBootcampId(
    bootcampId: string,
  ): Promise<AssessmentEntity[]> {
    try {
      const response = await this.httpService
        .get(
          `${this.environmentConfigService.ASSESSEMENT_SERVICE_URL}/bootcamp/${bootcampId}`,
        )
        .toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
