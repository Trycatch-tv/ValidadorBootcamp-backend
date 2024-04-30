import { ApiProperty } from "@nestjs/swagger";

export class UnauthorizedResponse {
  @ApiProperty({
    example: 401,
    description: 'Unauthorized',
  })
  statusCode: number;

  @ApiProperty({
    example: 'User is not authorized',
    description: 'Unauthorized error message',
  })
  message: string;
}