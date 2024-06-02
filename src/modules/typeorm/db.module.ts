import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';
import { DataSource } from 'typeorm';
import type { EnvironmentConfig } from '../../types/environment-config';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, EnvironmentConfigModule],
      inject: [ConfigService, EnvironmentConfigService],
      useFactory: (
        config: ConfigService<EnvironmentConfig>,
        environmentConfigService: EnvironmentConfigService,
      ) => {
        return {
          type: 'postgres',
          host: environmentConfigService.DATABASE_HOST,
          port: environmentConfigService.DATABASE_PORT,
          username: environmentConfigService.DATABASE_USER,
          password: environmentConfigService.DATABASE_PASSWORD,
          database: environmentConfigService.DATABASE_NAME,
          autoLoadEntities: true,
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
    }),
  ],
  providers: [ConfigModule, DbModule],
  exports: [],
})
export class DbModule {
  constructor(private dataSource: DataSource) {}
}
