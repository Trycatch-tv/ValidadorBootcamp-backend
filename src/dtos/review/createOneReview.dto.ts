import { ApiProperty } from '@nestjs/swagger';

export class CreateOneReviewDto {
  @ApiProperty({
    example: 'Me gustó mucho este bootcamp 10/10',
    description: 'Title',
  })
  title: string;

  @ApiProperty({
    example:
      'Me gustó mucho este bootcamp porque aprendí mucho y me ayudó a conseguir trabajo',
    description: 'Description',
  })
  description: string;

  @ApiProperty({
    example: 5.0,
    description: 'Score Overall',
  })
  score_overall: number;

  @ApiProperty({
    example: 5.0,
    description: 'Score Curriculum',
  })
  score_curriculum: number;

  @ApiProperty({
    example: 5.0,
    description: 'Score Job Support',
  })
  score_job_support: number;

  @ApiProperty({
    example: 'dd411f58-caf1-4441-a807-252fdfad6596',
    description: 'Bootcamp ID',
  })
  bootcamp_id: string;

  @ApiProperty({
    example: 'dd411f58-caf1-4441-a807-252fdfad6596',
    description: 'User ID',
  })
  user_id: string;
}
