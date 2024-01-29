import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { EnvironmentConfig } from '../../types/environment-config';

@Injectable()
export class EnvironmentConfigService implements EnvironmentConfig {
  FILE_SERVICE_URL: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  REVIEW_SERVICE_URL: string;
  NODE_ENV: EnvironmentConfig['NODE_ENV'];

  constructor(private config: ConfigService<EnvironmentConfig, true>) {
    this.FILE_SERVICE_URL = config.get('FILE_SERVICE_URL');
    this.DATABASE_HOST = config.get('DATABASE_HOST');
    this.DATABASE_PORT = config.get('DATABASE_PORT');
    this.DATABASE_USER = config.get('DATABASE_USER');
    this.DATABASE_PASSWORD = config.get('DATABASE_PASSWORD');
    this.DATABASE_NAME = config.get('DATABASE_NAME');
    this.REVIEW_SERVICE_URL = config.get('REVIEW_SERVICE_URL');
    this.NODE_ENV = config.get('NODE_ENV');
  }
}
