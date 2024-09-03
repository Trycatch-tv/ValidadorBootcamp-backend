import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FilesService } from 'src/services/files/files.service';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // TODO: El despliegue de este servicio debe ser privado, y adicionalmente contar con
  // un mecanismo de autenticación para comunicarse con los otros servicios.
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadOne(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const { id } = await this.filesService.uploadOne(file);
      res.status(200).json({ id });
    } catch (err) {
      throw err;
    }
  }
  // TODO: El despliegue de este servicio debe ser privado, y adicionalmente contar con
  // un mecanismo de autenticación para comunicarse con los otros servicios.
  @Get('/:id')
  async findOne(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    try {
      const file = await this.filesService.findOne(id);
      res.setHeader('Content-Type', file.mimetype);
      res.send(file.blob);
    } catch (err) {
      throw err;
    }
  }
}
