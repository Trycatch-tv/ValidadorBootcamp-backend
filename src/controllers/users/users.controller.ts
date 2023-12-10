import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/models/user/user.entity';
import { SignupResponse } from 'src/responses/users/signup.response';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Response } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninResponse } from 'src/responses/users/signin.response';
import { UsersService } from 'src/services/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  @ApiResponse({
    status: 200,
    description: 'Returns an array of users',
    type: [SignupResponse]
  })
  @Get('/')
  healthCheck(): string {
    return 'ok';
  getUsers(): Promise<SignupResponse[]> {
    return this.usersService.getUsers();
  }
  
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: SignupResponse,
  })
  @Post('signup')
<<<<<<< HEAD
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
<<<<<<< HEAD

  @Get('list')
  async list(): Promise<User[]> {
    return await this.usersService.list();
=======
  async signUp(@Body() signupDto: SignupDto): Promise<SignupResponse> {
    return await this.usersService.signup(signupDto);
>>>>>>> Apitoriadev/BE-Swagger-Users-SignIn
  }

  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'Sign in successful',
    type: SigninResponse,
  })
  @Get('signin')
  async signIn(@Body() signupDto: SignupDto): Promise<SigninResponse> {
    return await this.usersService.signin(signupDto);
  }
}
=======
}};
>>>>>>> 5-be-implementar-jest
