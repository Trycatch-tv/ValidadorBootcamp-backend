import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { SignupResponse } from 'src/responses/users/signup.response';
import { UsersService } from 'src/services/users/users.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninResponse } from 'src/responses/users/signin.response';

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
  async signUp(@Body() signupDto: SignupDto): Promise<SignupResponse> {
    return await this.usersService.signup(signupDto);
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
