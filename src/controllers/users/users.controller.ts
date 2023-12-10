import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { UserEntity } from 'src/models/user/user.entity';
import { SigninResponse } from 'src/responses/users/signin.response';
import { SignupResponse } from 'src/responses/users/signup.response';
import { UsersService } from 'src/services/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get('/')
  healthCheck(): string {
    return 'ok';
  }

  @ApiResponse({
    status: 200,
    description: 'Returns an array of users',
    type: [SignupResponse],
  })
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
  async signup(
    @Body() signupDto: SignupDto,
    // @Response() res: Response,
  ): Promise<any> {
    try {
      const signUpResponse = await this.usersService.signup(signupDto);
      return signUpResponse;
      // return res.status(Number(HttpStatus.CREATED)).send(signUpResponse);
    } catch (error) {
      // return res
      //   .status(Number(HttpStatus.BAD_REQUEST))
      //   .send({ errors: error.errors });
    }
  }

  // Obtenga una lista de usuarios que utilizan UsersService con consideraciones de seguridad
  @Get('list')
  async list(): Promise<UserEntity[]> {
    return await this.usersService.list();
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
