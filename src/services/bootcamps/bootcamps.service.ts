// import { passwordHelper } from './../../utils/crypto/crypto.utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BootcampEntity } from 'src/models/bootcamp/bootcamp.entity'; 
import { Repository } from 'typeorm';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectRepository(BootcampEntity)
    private bootcampRepository: Repository<BootcampEntity>,
  ) {}

  // TODO: Implementar la validación del usuario usando un token.
  async list(): Promise<BootcampEntity[]> {
    try {
      return await this.bootcampRepository.findBy({ is_active: true });
    } catch (error) {
      throw error;
    }
  }

}
