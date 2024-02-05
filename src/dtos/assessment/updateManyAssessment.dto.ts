import { ApiProperty } from '@nestjs/swagger';

export class UpdateManyAssessmentDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Bootcamp ID',
  })
  bootcamp_id: string;

  @ApiProperty({
    example: 4,
    description: 'Category ID',
  })
  category_id: number;

  @ApiProperty({
    example: 1,
    description: 'Criteria ID',
  })
  criteria_id: number;

  @ApiProperty({
    example: 4,
    description: 'Assessment score',
  })
  weight: number;
}
