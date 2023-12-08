import { ApiProperty } from "@nestjs/swagger";

export class SignupDto {
  id: string;
  @ApiProperty({ example: "John", description: 'User Name' })
  first_name: string;
  @ApiProperty({ example: "Doe", description: 'User Last Name' })
  last_name: string;
  @ApiProperty({ example: "johndoe@example.com", description: 'User Email' })
  email: string;  
  @ApiProperty({ example: "Password123", description: 'User Role' })
  password: string;
}