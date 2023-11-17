import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'trycatch_tv23',
      database: 'validador_bootcamps',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class DbModule {
  constructor(private dataSource: DataSource) {}
}
