import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesClient } from 'src/clients/files/files.client';
import { BootcampEntity } from 'src/models/bootcamp/bootcamp.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectRepository(BootcampEntity)
    private bootcampRepository: Repository<BootcampEntity>,
    private readonly filesClient: FilesClient,
  ) {}

  async findAll(): Promise<BootcampEntity[]> {
    try {
      const bootcamps = (
        await this.bootcampRepository.find({
          where: { is_active: true },
        })
      ).map((bootcamp) => {
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

  async findOne(id: string): Promise<BootcampEntity> {
    try {
      const bootcamp = await this.bootcampRepository.findOne({
        where: { id, is_active: true },
      });
      if (!bootcamp) throw new Error('Bootcamp not found');
      return bootcamp;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(
    id: string,
    bootcamp: Partial<BootcampEntity>,
  ): Promise<BootcampEntity> {
    try {
      const bootcampFound = await this.bootcampRepository.findOneOrFail({
        where: { id, is_active: true },
      });
      const updatedBootcamp = await this.bootcampRepository.save({
        ...bootcampFound,
        ...bootcamp,
      });
      return updatedBootcamp;
    } catch (error) {
      throw error;
    }
  }

  async search(key: string): Promise<BootcampEntity[]> {
    try {
      const bootcamps = await this.bootcampRepository.find({
        where: [
          { name: ILike(`%${key}%`), is_active: true },
          { description: ILike(`%${key}%`), is_active: true },
          { email: ILike(`%${key}%`), is_active: true },
          { country_name: ILike(`%${key}%`), is_active: true },
          { mode: ILike(`%${key}%`), is_active: true },
        ],
      });
      if (!bootcamps.length) throw new Error('Bootcamp not found');
      return bootcamps;
    } catch (error) {
      throw error;
    }
  }
  async removeOne(id: string): Promise<BootcampEntity> {
    try {
      const user = await this.bootcampRepository.findOneOrFail({
        where: { id, is_active: true },
      });
      user.is_active = false;
      return await this.bootcampRepository.save(user);
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async uploadAvatar(
    bootcampId: string,
    avatar: any,
  ): Promise<BootcampEntity | any> {
    try {
      // verificar si el bootcamp existe
      const bootcamp = await this.bootcampRepository.findOneOrFail({
        where: { id: bootcampId, is_active: true },
      });
      // si existe enviar el avatar al servicio de archivos
      const fileUploadResponse = await this.filesClient.uploadOne(avatar);
      // Con la respuesta (uuid del archivo) actualizar el bootcamp (avatar)
      bootcamp.avatar = fileUploadResponse.id;
      return await this.bootcampRepository.save(bootcamp);
    } catch (error) {
      throw error;
    }
  }
}
