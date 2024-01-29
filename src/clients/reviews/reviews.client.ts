import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';

@Injectable()
export class ReviewsClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async getScoreAverage(bootcampId: string): Promise<number> {
    try {
      const response = await this.httpService
        .get(
          `${this.environmentConfigService.getReviewsServiceUrl()}/bootcamp/${bootcampId}/average`,
        )
        .toPromise();
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
