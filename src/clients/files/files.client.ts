import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
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
      // const fileName = `${file.name}.${file.extension}`;
      // const newFile = new File([file.blob], fileName);
      // formData.append('file', newFile, file.originalname);
      formData.append('file', file);

      const options = {
        method: 'POST',
        url: `${this.environmentConfigService.getFileServiceUrl()}/upload`,
        headers: {
          'Content-Type':
            'multipart/form-data; boundary=---011000010111000001101001',
        },
        data: formData,
      };
      const uploadFileResponse = await axios.request(options);
      return uploadFileResponse.data;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string) {
    try {
      return await this.httpService.get(
        `${this.environmentConfigService.getFileServiceUrl}/${id}`,
      );
    } catch (err) {
      throw err;
    }
  }
}
