import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BootcampEntity } from 'src/models/bootcamp/bootcamp.entity';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';

@Injectable()
export class BootcampsClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async getScoreAverage(bootcampId: string, token: string): Promise<number> {
    try {
      const response = await this.httpService
        .get(
          `${this.environmentConfigService.BOOTCAMP_SERVICE_URL}/score/${bootcampId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        )
        .toPromise();
      return response.data.score;
    } catch (error) {
      throw error;
    }
  }

  async updateScore(
    bootcampId: string,
    score: number,
  ): Promise<BootcampEntity> {
    try {
      const updateScoreResponse = await this.httpService
        .post(
          `${this.environmentConfigService.BOOTCAMP_SERVICE_URL}/score/${bootcampId}`,
          {
            score,
          },
        )
        .toPromise();
      return updateScoreResponse.data;
    } catch (error) {
      throw error;
    }
  }

  async recalculateScoreAverage(bootcampId: string): Promise<BootcampEntity> {
    try {
      const response = await this.httpService
        .post(
          `${this.environmentConfigService.BOOTCAMP_SERVICE_URL}/score/recalculate/${bootcampId}`,
        )
        .toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
