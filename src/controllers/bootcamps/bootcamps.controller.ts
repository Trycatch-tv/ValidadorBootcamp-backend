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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBootcampDto } from 'src/dtos/bootcamps/createBootcamp.dto';
import { UpdateBootcampDto } from 'src/dtos/bootcamps/updateBootcamp.dto';
import { CreateOneBootcampResponse } from 'src/responses/bootcamps/createOneBootcamp.response';
import { findAllBootcampsResponse } from 'src/responses/bootcamps/findAllBootcamp.response';
import { FindOneBootcampsResponse } from 'src/responses/bootcamps/findOneBootcamp.response';
import { RemoveOneBootcampResponse } from 'src/responses/bootcamps/removeOneBootcamp.response';
import { SearchBootcampsResponse } from 'src/responses/bootcamps/searchBootcamp.response';
import { UpdateOneBootcampResponse } from 'src/responses/bootcamps/updateOneBootcamp.response';
import { BootcampsService } from 'src/services/bootcamps/bootcamps.service';

@ApiTags('Bootcamps')
@Controller('bootcamps')
export class BootcampsController {
  constructor(private readonly bootcampsService: BootcampsService) {
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
  @Post('create')
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

  @ApiBody({ type: CreateBootcampDto })
  @ApiResponse({
    status: 200,
    description: 'Returns a bootcamp by id',
    type: [FindOneBootcampsResponse],
  })
  @Post('avatar/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Body('bootcampId', ParseUUIDPipe) bootcampId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FindOneBootcampsResponse | any> {
    try {
      return await this.bootcampsService.uploadAvatar(bootcampId, file);
    } catch (error) {
      throw new HttpException(
        'Error al subir el avatar del bootcamp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
