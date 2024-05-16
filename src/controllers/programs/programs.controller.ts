import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { FilesClient } from 'src/clients/files/files.client';
import { CreateOneProgramDto } from 'src/dtos/programs/createOneProgram.dto';
import { UploadContentProgramDto } from 'src/dtos/programs/uploadContentProgram.dto';
import { FindAllProgramsResponse } from 'src/responses/programs/findAllPrograms.response';
import { FindManyByBootcampIdProgramsResponse } from 'src/responses/programs/findManyByBootcampIdPrograms.response';
import { ProgramsBaseResponse } from 'src/responses/programs/programsBase.response';
import { UploadContentProgram } from 'src/responses/programs/uploadContentProgram.response';
import { ProgramsService } from 'src/services/programs/programs.service';

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController {
  constructor(
    private readonly programsService: ProgramsService,
    private readonly filesClient: FilesClient,
  ) {}

  @ApiBody({ type: CreateOneProgramDto })
  @ApiResponse({
    status: 200,
    description: 'Program created successfully',
    type: ProgramsBaseResponse,
  })
  @Post('/')
  async createOne(
    @Body() createOneProgramDto: CreateOneProgramDto,
  ): Promise<ProgramsBaseResponse> {
    try {
      return this.programsService.createOne(createOneProgramDto);
    } catch (error) {
      throw new HttpException(
        'Error al crear el programa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Programs found successfully',
    type: FindAllProgramsResponse,
  })
  @Get('/list')
  async findAll(): Promise<FindAllProgramsResponse[]> {
    try {
      return this.programsService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error al buscar los programas',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Programs found successfully',
    type: FindManyByBootcampIdProgramsResponse,
  })
  @Get('/bootcamp/:id')
  async findManyByBootcampId(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FindManyByBootcampIdProgramsResponse[]> {
    try {
      return this.programsService.findManyByBootcampId(id);
    } catch (error) {
      throw new HttpException(
        'Error al buscar el programa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBody({ type: UploadContentProgramDto })
  @ApiResponse({
    status: 200,
    description: 'Program content uploaded successfully',
    type: [UploadContentProgram],
  })
  @Post('content/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        programId: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadContent(
    @Body('programId', ParseUUIDPipe) programId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadContentProgram> {
    try {
      const programExists = await this.programsService.exists(programId);
      if (!programExists) throw new Error('Programa no encontrado');
      const fileUploadResponse = await this.filesClient.uploadOne(file);
      return await this.programsService.uploadContent(
        programId,
        fileUploadResponse.id,
      );
    } catch (error) {
      throw new HttpException(
        'Error al subir el contenido del programa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Program content found successfully',
    type: typeof Blob,
  })
  @Get('content/:id')
  async findOneContent(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    try {
      const program = await this.programsService.findOneContent(id);
      if (program.content !== null) {
        const file = await firstValueFrom(
          await this.filesClient.findOne(program.content),
        );
        const binaryFile = Buffer.from(file.data, 'binary');
        res.setHeader('Content-Type', file.headers['content-type']);
        res.send(binaryFile);
      } else {
        res.send({ content: null });
      }
    } catch (error) {
      throw new HttpException(
        'Error al buscar el contenido del programa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
