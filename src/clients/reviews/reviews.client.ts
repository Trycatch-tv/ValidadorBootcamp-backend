import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { envs } from 'src/types/environment-config';

@Injectable()
export class ReviewsClient {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getScoreAverage(bootcampId: string): Promise<number> {
    try {
      const response = await this.httpService
        .get(
          `${envs.REVIEW_SERVICE_URL}/bootcamp/${bootcampId}/average`,
        )
        .toPromise();
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
