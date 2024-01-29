import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { FilesClient } from 'src/clients/files/files.client';
import { CreateBootcampDto } from 'src/dtos/bootcamps/createBootcamp.dto';
import { UpdateBootcampDto } from 'src/dtos/bootcamps/updateBootcamp.dto';
import { UpdateScoreBootcampDto } from 'src/dtos/bootcamps/updateScoreBoocamp.dto';
import { UploadAvatarBootcampDto } from 'src/dtos/bootcamps/uploadAvatarBootcamp.dto';
import { UploadTermsAndConditionsBootcampDto } from 'src/dtos/bootcamps/uploadTermsAndConditionsBootcamp.dto';
import { BootcampEntity } from 'src/models/bootcamp/bootcamp.entity';
import { CreateOneBootcampResponse } from 'src/responses/bootcamps/createOneBootcamp.response';
import { findAllBootcampsResponse } from 'src/responses/bootcamps/findAllBootcamp.response';
import { FindAllByScoreBootcampsResponse } from 'src/responses/bootcamps/findAllByScoreBootcamps.response';
import { FindOneBootcampsResponse } from 'src/responses/bootcamps/findOneBootcamp.response';
import { RemoveOneBootcampResponse } from 'src/responses/bootcamps/removeOneBootcamp.response';
import { SearchBootcampsResponse } from 'src/responses/bootcamps/searchBootcamp.response';
import { UpdateOneBootcampResponse } from 'src/responses/bootcamps/updateOneBootcamp.response';
import { UpdateScoreBootcampResponse } from 'src/responses/bootcamps/updateScoreBootcamp.response';
import { UploadAvatarBootcampResponse } from 'src/responses/bootcamps/uploadAvatarBootcamp.response';
import { UploadTermsAndConditionsBootcampResponse } from 'src/responses/bootcamps/uploadTermsAndConditionsBootcamp.response';
import { BootcampsService } from 'src/services/bootcamps/bootcamps.service';

@ApiTags('Bootcamps')
@Controller('bootcamps')
export class BootcampsController {
  constructor(
    private readonly bootcampsService: BootcampsService,
    private readonly filesClient: FilesClient,
  ) {
    this.bootcampsService = bootcampsService;
  }

  @Get('/')
  healthCheck(): string {
    return 'ok';
  }

  @ApiResponse({
    status: 200,
    description: 'Returns an array of bootcamps',
    type: [findAllBootcampsResponse],
  })
  @Get('list')
  async findAll(): Promise<findAllBootcampsResponse[]> {
    return await this.bootcampsService.findAll();
  }

  @ApiBody({ type: CreateBootcampDto })
  @ApiResponse({
    status: 200,
    description: 'Bootcamp created by admin',
    type: [CreateOneBootcampResponse],
  })
  @Post('/')
  async createOne(
    @Body() body: CreateBootcampDto,
  ): Promise<CreateOneBootcampResponse> {
    try {
      return await this.bootcampsService.createOne(body);
    } catch (error) {
      throw new HttpException(
        'Error al crear bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a bootcamp by id',
    type: [FindOneBootcampsResponse],
  })
  @Get('/:id')
  async findOne(id: string): Promise<FindOneBootcampsResponse> {
    try {
      return await this.bootcampsService.findOne(id);
    } catch (error) {
      throw new HttpException(
        'Error al buscar bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBody({ type: CreateBootcampDto })
  @ApiResponse({
    status: 200,
    description: 'Returns a bootcamp updated by id',
    type: [UpdateOneBootcampResponse],
  })
  @Put('update/:id')
  async updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() bootcamp: Partial<UpdateBootcampDto>,
  ): Promise<UpdateOneBootcampResponse> {
    try {
      return await this.bootcampsService.updateOne(id, bootcamp);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a bootcamp searched by key',
    type: [SearchBootcampsResponse],
  })
  @Get('search/:key')
  async search(@Param('key') key: string): Promise<SearchBootcampsResponse[]> {
    try {
      return await this.bootcampsService.search(key);
    } catch (error) {
      throw new HttpException(
        'Error al buscar bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Remove bootcamp by id.',
    type: [RemoveOneBootcampResponse],
  })
  @Delete('delete/:id')
  async removeOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<RemoveOneBootcampResponse> {
    try {
      return await this.bootcampsService.removeOne(id);
    } catch (error) {
      throw new HttpException(
        'Error al eliminar bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBody({ type: UploadAvatarBootcampDto })
  @ApiResponse({
    status: 200,
    description: 'Returns a bootcamp by id',
    type: [UploadAvatarBootcampResponse],
  })
  @Post('avatar/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bootcampId: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Body('bootcampId', ParseUUIDPipe) bootcampId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadAvatarBootcampResponse> {
    try {
      const bootcampExists = await this.bootcampsService.exists(bootcampId);
      if (!bootcampExists) throw new Error('Bootcamp not found');
      const fileUploadResponse = await this.filesClient.uploadOne(file);
      return await this.bootcampsService.uploadAvatar(
        bootcampId,
        fileUploadResponse.id,
      );
    } catch (error) {
      throw new HttpException(
        'Error al subir el avatar del bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a bootcamp avatar by id',
    type: typeof Blob,
  })
  @Get('avatar/:id')
  async findOneAvatar(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    try {
      const bootcamp = await this.bootcampsService.findOneAvatar(id);
      if (bootcamp.avatar !== null) {
        const file = await firstValueFrom(
          await this.filesClient.findOne(bootcamp.avatar),
        );
        const binaryFile = Buffer.from(file.data, 'binary');
        res.setHeader('Content-Type', file.headers['content-type']);
        res.send(binaryFile);
      } else {
        res.sendFile('default_avatar.png', {
          root: './src/assets/img/',
        });
      }
    } catch (error) {
      throw new HttpException(
        'Error al obtener el avatar del bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBody({ type: UploadTermsAndConditionsBootcampDto })
  @ApiResponse({
    status: 200,
    description: 'Upload terms and conditions by bootcamp id',
    type: UploadTermsAndConditionsBootcampResponse,
  })
  @Post('terms-and-conditions/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bootcampId: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadTermsAndConditions(
    @Body('bootcampId', ParseUUIDPipe)
    bootcampId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadAvatarBootcampResponse> {
    try {
      const bootcampExists = await this.bootcampsService.exists(bootcampId);
      if (!bootcampExists) throw new Error('Bootcamp not found');
      const fileUploadResponse = await this.filesClient.uploadOne(file);
      return await this.bootcampsService.uploadTermsAndConditions(
        bootcampId,
        fileUploadResponse.id,
      );
    } catch (error) {
      throw new HttpException(
        'Error al subir los terminos y condiciones del bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a bootcamp terms and conditions by id',
    type: typeof Blob,
  })
  @Get('terms-and-conditions/:id')
  async findOneTermsAndConditions(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    try {
      const bootcamp =
        await this.bootcampsService.findOneTermsAndConditions(id);
      if (bootcamp.terms_and_conditions !== null) {
        const file = await firstValueFrom(
          await this.filesClient.findOne(bootcamp.terms_and_conditions),
        );
        const binaryFile = Buffer.from(file.data, 'binary');
        res.setHeader('Content-Type', file.headers['content-type']);
        res.send(binaryFile);
      } else {
        res.send({ terms_and_conditions: null });
      }
    } catch (error) {
      throw new HttpException(
        'Error al obtener los terminos y condiciones del bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBody({ type: UpdateScoreBootcampDto })
  @ApiResponse({
    status: 200,
    description: 'Updated score by bootcamp id',
    type: [UpdateScoreBootcampResponse],
  })
  @Post('score/:id')
  async updateScore(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('score') score: number,
  ): Promise<UpdateScoreBootcampResponse> {
    try {
      return await this.bootcampsService.updateScore(id, score);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el score del bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns bootcamps ranking by score',
    type: [FindAllByScoreBootcampsResponse],
  })
  @Get('ranking/list')
  async findAllByScore(): Promise<FindAllByScoreBootcampsResponse[]> {
    try {
      return await this.bootcampsService.findAllByScore();
    } catch (error) {
      throw new HttpException(
        'Error al obtener el ranking del bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns bootcamp score average by id',
    type: Number,
  })
  @Get('score/:id')
  async getScoreAverage(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BootcampEntity | any> {
    try {
      return await this.bootcampsService.getScoreAverage(id);
    } catch (error) {
      throw new HttpException(
        'Error al obtener el score promedio del bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
