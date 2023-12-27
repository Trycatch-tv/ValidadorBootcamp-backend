import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  [x: string]: any;
  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  last_name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
  })
  email: string;
}
