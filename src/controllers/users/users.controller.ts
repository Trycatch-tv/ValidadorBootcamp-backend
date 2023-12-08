/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Response, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { User } from 'src/models/user/user.entity';
import { SignupService } from 'src/services/signup/signup.service';

export interface SignupDto {
  name: string;
  email: string;
  password: string;
  // Add the missing properties from the User interface
  id: string;
  role: string;
  is_active: boolean;
  // TODO: Add any other missing properties
}

interface SignupResponse {
  // Existing properties
  name: string;
  email: string;
  id: string;
}

@Controller()
export class UsersController {
  constructor(
    private readonly signupService: SignupService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  healthCheck(): string {
    return 'ok';
  }

  @Post('signup')
async signup(@Body() signupDto: SignupDto, @Response() res: Response): Promise<any> {
  try {
    const user: User = {
      name: signupDto.name,
      email: signupDto.email,
      password: signupDto.password,
      // Set any default values for missing properties
      id: '',
      role: 'user',
      is_active: false,
      setDefaultRole: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      first_name: '',
      last_name: '',
      created_at: undefined,
      updated_at: undefined
    };
    const registeredUser = await this.signupService.signup(user);
    const response: SignupResponse = {
      name: registeredUser.name,
      email: registeredUser.email,
      id: registeredUser.id,
    };
    return res.status(HttpStatus.CREATED).send(response);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send({ errors: error.errors });
  }
}};