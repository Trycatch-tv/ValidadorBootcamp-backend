import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'; import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBootcampDto } from 'src/dtos/bootcamps/createBootcamp.dto';
import { CreateOneBootcampResponse } from 'src/responses/bootcamps/createOneBootcamp.response';
import { GetBootcampsResponse } from 'src/responses/bootcamps/getbootcamps.response';
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
    type: [GetBootcampsResponse],
  })
  @Get('list')
  async list(): Promise<any[]> {
    return await this.bootcampsService.getBootcamps();
  }

  @ApiBody({ type: CreateBootcampDto })
  @ApiResponse({
    status: 200,
    description: 'User created by admin',
    type: [CreateOneBootcampResponse],

  })
  @Post('create')
  async createOne(@Body() body: CreateBootcampDto): Promise<CreateOneBootcampResponse> {
    try {
      return await this.bootcampsService.createOne(body);
    } catch (error) {
      throw new HttpException('Error al crear bootcamp', HttpStatus.BAD_REQUEST);
    }
  }
}
