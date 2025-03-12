import { ApiProperty } from '@nestjs/swagger';

export class BaseAssessmentResponse {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Assessment ID',
  })
  id?: string;

  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Bootcamp ID',
  })
  bootcamp_id: string;

  @ApiProperty({
    example: 2,
    description: 'Category ID',
  })
  category_id: number;

  @ApiProperty({
    example: 3,
    description: 'Criteria ID',
  })
  criteria_id: string;

  @ApiProperty({
    type: Number,
    example: 3,
    description: 'Assessment score',
  })
  weight: number;
}
