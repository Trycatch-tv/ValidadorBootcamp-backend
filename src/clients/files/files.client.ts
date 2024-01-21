import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';

@Injectable()
export class FilesClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async uploadOne(file: Express.Multer.File | any) {
    try {
      const formData = new FormData();
      if (file.buffer) {
        formData.append('file', file.buffer, file.originalname);
      } else {
        throw new Error('No file provided');
      }

      const options = {
        method: 'POST',
        url: `${this.environmentConfigService.FILE_SERVICE_URL}/upload`,
        headers: formData.getHeaders(),
        data: formData,
      } as const;

      const uploadFileResponse = await axios.request(options);
      return uploadFileResponse.data;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string) {
    try {
      return this.httpService.get(
        `${this.environmentConfigService.FILE_SERVICE_URL}/${id}`,
        { responseType: 'arraybuffer' },
      );
    } catch (err) {
      throw err;
    }
  }
}
