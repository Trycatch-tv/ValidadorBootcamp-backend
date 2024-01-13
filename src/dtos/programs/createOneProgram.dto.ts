import { ApiProperty } from '@nestjs/swagger';

export class CreateOneProgramDto {
  @ApiProperty({
    example: 'Bootcamp Fullstack Java + Angular',
    description: 'The name of the program',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Virtual',
    description: 'user to lasted update',
    required: true,
    enum: ['Virtual', 'Presencial', 'Mixto'],
  })
  mode: string;

  @ApiProperty({
    example: 24,
    description: 'The duration of the program in months',
    required: true,
  })
  duration: number;

  @ApiProperty({
    example: 'dd411f58-caf1-4441-a807-252fdfad6596',
    description: 'The id of the bootcamp',
    required: true,
  })
  bootcamp_id: string;

  @ApiProperty({
    example: 'dd411f58-caf1-4441-a807-252fdfad6596',
    description: 'The id of the user',
    required: true,
  })
  user_id: string;
}
