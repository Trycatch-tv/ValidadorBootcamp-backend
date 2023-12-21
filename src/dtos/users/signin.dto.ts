import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({ example: 'me@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  password: string;
}
