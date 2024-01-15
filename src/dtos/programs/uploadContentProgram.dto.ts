import { ApiProperty } from '@nestjs/swagger';

export class UploadContentProgramDto {
  @ApiProperty({
    example: '13b30c6a-519b-481e-83b4-1ab4f824cd8e',
    description: 'program UUID',
    required: true,
  })
  program_id: string;

  @ApiProperty({
    example: 'avatar.png(file)',
    description: 'program content file',
    required: true,
  })
  file: Express.Multer.File;
}
