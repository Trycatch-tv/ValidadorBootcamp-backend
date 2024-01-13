import { ApiProperty } from '@nestjs/swagger';

export class UpdateScoreBootcampDto {
  @ApiProperty({
    example: '0f7baf8a-7ab8-4844-86c1-1f31007f2d05',
    description: 'Bootcamp id',
  })
  id: string;

  @ApiProperty({
    example: 3.5,
    description: 'Bootcamp score',
  })
  score: number;
}
