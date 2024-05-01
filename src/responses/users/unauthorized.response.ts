import { ApiProperty } from "@nestjs/swagger";

export class UnauthorizedResponse {
  @ApiProperty({
    example: 'Token is invalid',
    description: 'Unauthorized error message',
  })
  message: string;
  @ApiProperty({
    example: 'Unauthorized',
    description: 'Unauthorized',
  })
  error: string;
  @ApiProperty({
    example: 401,
    description: 'Unauthorized',
  })
  statusCode: number;
}