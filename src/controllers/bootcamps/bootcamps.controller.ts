import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
  async list(): Promise<GetBootcampsResponse[]> {
    return await this.bootcampsService.getBootcamps();
  }
}
