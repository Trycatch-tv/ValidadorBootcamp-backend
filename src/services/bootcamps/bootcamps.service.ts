// import { passwordHelper } from './../../utils/crypto/crypto.utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BootcampEntity } from 'src/models/bootcamp/bootcamp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectRepository(BootcampEntity)
    private bootcampRepository: Repository<BootcampEntity>,
  ) { }

  async getBootcamps(): Promise<BootcampEntity[]> {
    try {
      const bootcamps = (
        await this.bootcampRepository.find({
          where: { is_active: true },
        })
      ).map((bootcamp) => {
        delete bootcamp.id;
        return bootcamp;
      });

      return bootcamps;
    } catch (error) {
      throw error;
    }
  }

  async createOne(bootcamp: Partial<BootcampEntity>): Promise<BootcampEntity> {
    const newBootcamp = this.bootcampRepository.create(bootcamp);
    return await this.bootcampRepository.save(newBootcamp);
  }
}
