import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from 'src/controllers/files/files.controller';
import { FileEntity } from 'src/models/file/file.entity';
import { FilesService } from 'src/services/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [TypeOrmModule],
})
export class FilesModule {}
