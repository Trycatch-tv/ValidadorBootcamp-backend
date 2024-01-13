import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateOneProgramDto } from 'src/dtos/programs/createOneProgram.dto';
import { ProgramsBaseResponse } from 'src/responses/programs/programsBase.response';
import { ProgramsService } from 'src/services/programs/programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

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
}
