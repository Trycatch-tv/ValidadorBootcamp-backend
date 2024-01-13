import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsController } from 'src/controllers/programs/programs.controller';
import { ProgramEntity } from 'src/models/program/program.entity';
import { ProgramsService } from 'src/services/programs/programs.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramEntity])],
  controllers: [ProgramsController],
  providers: [ProgramsService],
  exports: [TypeOrmModule],
})
export class ProgramsModule {}
