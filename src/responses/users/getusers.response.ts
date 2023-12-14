import { ApiProperty } from '@nestjs/swagger';

export class GetUsersResponse {
  @ApiProperty({
    example: 'b6a5cf9b-4585-4df9-b075-3f2e61689499',
    description: 'User Id',
  })
  id: string;

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

  @ApiProperty({
    example: 'user',
    description: 'User role',
  })
  role: string;
}
