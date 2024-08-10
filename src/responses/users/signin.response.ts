import { ApiProperty } from '@nestjs/swagger';

export class SigninResponse {
  @ApiProperty({
    example: 'b6a5cf9b-4585-4df9-b075-3f2e61689499',
    description: 'User Id',
  })
  id: string;
  @ApiProperty({ example: 'johndoe@example.com', description: 'User Email' })
  email: string;
  @ApiProperty({ example: 'user', description: 'User Role' })
  role: string;
  @ApiProperty({ example: 'true', description: 'User successfully logged' })
  isLogedIn?: boolean;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'JWT Token',
  })
  token: string;
}
