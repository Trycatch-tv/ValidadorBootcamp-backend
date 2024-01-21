import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { EnvironmentConfig } from '../../types/environment-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentConfig>) => {
        return {
          type: 'postgres',
          host: config.get('DATABASE_HOST'),
          port: config.get('DATABASE_PORT'),
          username: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASSWORD'),
          database: config.get('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: config.get('NODE_ENV') === 'dev' satisfies EnvironmentConfig['NODE_ENV'],
        } as TypeOrmModuleOptions;
      },
    }),
  ],
  providers: [ConfigModule],
  exports: [],
})
export class DbModule {
  constructor(private dataSource: DataSource) {}
}
