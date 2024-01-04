import { ApiProperty } from '@nestjs/swagger';

export class UploadTermsAndConditionsBootcampDto {
  @ApiProperty({
    example: '13b30c6a-519b-481e-83b4-1ab4f824cd8e',
    description: 'bootcamp UUID',
    required: true,
  })
  bootcamp_id: string;

  @ApiProperty({
    example: 'avatar.png(file)',
    description: 'bootcamp avatar file',
    required: true,
  })
  file: Express.Multer.File;
}
