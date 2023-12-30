import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private config: ConfigService) {}

  getDatabaseHost(): string {
    return this.config.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return Number(this.config.get<number>('DATABASE_PORT'));
  }

  getDatabaseUser(): string {
    return this.config.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.config.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.config.get<string>('DATABASE_NAME');
  }

  getFileServiceUrl(): string {
    return this.config.get<string>('FILE_SERVICE_URL');
  }
}
