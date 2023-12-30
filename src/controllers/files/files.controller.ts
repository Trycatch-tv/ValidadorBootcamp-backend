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
import { Response } from 'express';
import { FilesService } from 'src/services/files/files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

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
