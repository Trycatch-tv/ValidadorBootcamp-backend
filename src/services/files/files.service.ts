import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/models/file/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async uploadOne(file: any) {
    const newFileEntity = {
      name: file.originalname,
      blob: file.buffer,
      mimetype: file.mimetype,
    };
    const newFile = this.fileRepository.create(newFileEntity);
    return await this.fileRepository.save(newFile);
  }

  async findOne(id: string) {
    return await this.fileRepository.findOne({
      where: { id },
    });
  }
}
