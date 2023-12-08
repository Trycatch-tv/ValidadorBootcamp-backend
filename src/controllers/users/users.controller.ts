import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { User } from 'src/models/user/user.entity';
import { SignupResponse } from 'src/responses/users/signup.response';
import { UsersService } from 'src/services/users/users.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninResponse } from 'src/responses/users/signin.response';

@ApiTags('Users')
@Controller('users') //El nombre es necesario para que funcione el path en app.module.ts y para que el Swagger arme los paths.
export class UsersController {
  private readonly usersService: UsersService;
  constructor(usersService: UsersService) {
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

  @ApiResponse({
    status: 200,
    description: 'Returns a saved user',
    type: [SignupResponse]
  })
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<SignupResponse> {
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

  @ApiResponse({
    status: 200,
    description: 'Returns an array of users',
    type: [SignupResponse]
  })
  @Get('list')
  async list(): Promise<SignupResponse[]> {
    return await this.usersService.list();
  }
}
