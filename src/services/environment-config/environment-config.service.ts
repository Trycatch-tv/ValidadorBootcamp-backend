import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private config: ConfigService) {}

  getDatabaseHost(): string {
    console.log(this.config.get<string>('DATABASE_HOST'));
    return this.config.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    console.log(this.config.get<number>('DATABASE_PORT'));
    return Number(this.config.get<number>('DATABASE_PORT'));
  }

  getDatabaseUser(): string {
    console.log(this.config.get<string>('DATABASE_USER'));
    return this.config.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    console.log(this.config.get<string>('DATABASE_PASSWORD'));
    return this.config.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    console.log(this.config.get<string>('DATABASE_NAME'));
    return this.config.get<string>('DATABASE_NAME');
  }
}
