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

  async findAll(): Promise<ProgramEntity[]> {
    try {
      return await this.programsRepository.find({
        where: { is_active: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findManyByBootcampId(id: string): Promise<ProgramEntity[]> {
    try {
      return await this.programsRepository.find({
        where: { bootcamp_id: id, is_active: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async uploadContent(
    programId: string,
    contentUUID: string,
  ): Promise<ProgramEntity> {
    try {
      const program = await this.programsRepository.findOneOrFail({
        where: { id: programId, is_active: true },
      });
      program.content = contentUUID;
      return await this.programsRepository.save(program);
    } catch (error) {
      throw error;
    }
  }

  async findOneContent(id: string): Promise<ProgramEntity> {
    try {
      return await this.programsRepository.findOneOrFail({
        where: { id, is_active: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const program = await this.programsRepository.findOneOrFail({
        where: { id, is_active: true },
      });
      return !!program;
    } catch (error) {
      return false;
    }
  }
}
