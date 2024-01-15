import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesClient } from 'src/clients/files/files.client';
import { ProgramsController } from 'src/controllers/programs/programs.controller';
import { ProgramEntity } from 'src/models/program/program.entity';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';
import { ProgramsService } from 'src/services/programs/programs.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([ProgramEntity])],
  controllers: [ProgramsController],
  providers: [ProgramsService, FilesClient, EnvironmentConfigService],
  exports: [TypeOrmModule],
})
export class ProgramsModule {}
