import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { envs } from 'src/types/environment-config';

@Injectable()
export class FilesClient {
  constructor(
    private readonly httpService: HttpService,
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
        url: `${envs.FILE_SERVICE_URL}/upload`,
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
        `${envs.FILE_SERVICE_URL}/${id}`,
        { responseType: 'arraybuffer' },
      );
    } catch (err) {
      throw err;
    }
  }
}
