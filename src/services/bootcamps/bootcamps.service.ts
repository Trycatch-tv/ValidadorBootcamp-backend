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
  ) { }

  // TODO: Implementar la validación del usuario usando un token.
  async getBootcamps(): Promise<BootcampEntity[]> {
    // Usa un objeto de proyección para seleccionar datos específicos del bootcamp
    // Esto protege la información confidencial y cumple con las pautas de seguridad
    const projection = {
      id: true,
      name: true,
      description: true,
      url: true,
      facebook_url: true,
      instragram_url: true,
      is_endorsed: true,
      endorsedBy: true,
      is_verified: true,
      score: true,
      country_name: true,
      country_iso: true,
      mode: true,
      email: true,
      phone: true,
      user_id: true,
      is_active: true,
      created_at: true,
      updated_at: true,
    };
    const bootcamps = await this.bootcampRepository.find({
      select: projection,
      where: { is_active: true },
    });

    return bootcamps;
  }

}
