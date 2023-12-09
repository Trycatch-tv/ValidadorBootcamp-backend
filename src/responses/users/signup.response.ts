import { ApiProperty } from "@nestjs/swagger";

export class SignupResponse {
  @ApiProperty({ example: "b6a5cf9b-4585-4df9-b075-3f2e61689499", description: 'User Id' })
  id: string;
  @ApiProperty({ example: "John", description: 'User Name' })
  first_name: string;
  @ApiProperty({ example: "Doe", description: 'User Last Name' })
  last_name: string;
  @ApiProperty({ example: "johndoe@example.com", description: 'User Email' })
  email: string;
  @ApiProperty({ example: "Password123", description: 'User Password' })
  password: string;
  @ApiProperty({ example: "Admin", description: 'User Role' })
  role: string;
}