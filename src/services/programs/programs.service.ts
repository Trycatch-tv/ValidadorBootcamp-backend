import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramEntity } from 'src/models/program/program.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programsRepository: Repository<ProgramEntity>,
  ) {}

  async createOne(
    programEntity: Partial<ProgramEntity>,
  ): Promise<ProgramEntity> {
    try {
      const newProgram = this.programsRepository.create(programEntity);
      return await this.programsRepository.save(newProgram);
    } catch (error) {
      throw error;
    }
  }
}
