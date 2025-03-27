import { ApiProperty } from '@nestjs/swagger';

export class FindOneUserResponse {
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

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNmI2YjRkNC04YzRjLTRiYTItOGIzMS0xMTMzNTg1NThiMGMiLCJ1c2VybmFtZSI6Imp1ZGx1cEB0cnljYXRjaC50diIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MzA0NDI2MiwiZXhwIjoxNzQzNjQ5MDYyfQ.l3E_js1hb3FnYS_991IzGy95twLGfDYvghqBSrIo-U4',
    description: 'Refresh Token',
  })
  refresh_token?: string;
}
