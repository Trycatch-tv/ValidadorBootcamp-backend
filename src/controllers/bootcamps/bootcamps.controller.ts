import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BootcampEntity } from 'src/models/bootcamp/bootcamp.entity'; 
import { ListBootcampsResponse } from 'src/responses/bootcamps/list.response';
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
    type: [ListBootcampsResponse],
  })
  @Get('list')
  async list(): Promise<BootcampEntity[]> {
    return await this.bootcampsService.list();
  }

}
