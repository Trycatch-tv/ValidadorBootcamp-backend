import { Module } from '@nestjs/common';
import { TypeOrmModule,  } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import config from 'src/config/database/type-orm-config';

@Module({
  imports: [TypeOrmModule.forRoot(config)],
})
export class DbModule {
  constructor(private dataSource: DataSource) {}
}
