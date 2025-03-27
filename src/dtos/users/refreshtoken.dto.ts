import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNmI2YjRkNC04YzRjLTRiYTItOGIzMS0xMTMzNTg1NThiMGMiLCJ1c2VybmFtZSI6Imp1ZGx1cEB0cnljYXRjaC50diIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MzA0NDI2MiwiZXhwIjoxNzQzNjQ5MDYyfQ.l3E_js1hb3FnYS_991IzGy95twLGfDYvghqBSrIo-U4',
    description: 'Refresh Token',
  })
  refreshToken: string;
}
