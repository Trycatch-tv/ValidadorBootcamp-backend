import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { SignupDto } from 'src/dtos/users/signup.dto';
// import { User } from 'src/models/user/user.entity';
import { SignupResponse } from 'src/responses/users/signup.response';
import { UsersService } from 'src/services/users/users.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users') //El nombre es necesario para que funcione el path en app.module.ts y para que el Swagger arme los paths.
export class UsersController {
  
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'Returns an array of users',
    type: [SignupResponse],
  })
  @Get('/')
  getUsers(): Promise<SignupResponse[]> {
    return this.usersService.getUsers();
  }

  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'Returns a saved user',
    type: [SignupResponse],
  })
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<SignupResponse> {
    return await this.usersService.signUpUser(signupDto);
  }

  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'Returns a saved user',
    type: [SignupResponse],
  })
  @Post('updateUser')
  async updateUser(@Body() signupDto: SignupDto): Promise<SignupResponse> {
    return await this.usersService.modUser(signupDto);
  }

  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'Sign in successful',
    type: SignupResponse,
  })
  @Get('findUser')
  async findUser(@Body() signupDto: SignupDto): Promise<SignupResponse> {
    if (signupDto.email) {
      return await this.usersService.byEmail(signupDto.email);
    } else if (signupDto.id) {
      return await this.usersService.byID(signupDto.id);
    } else if (signupDto.first_name && signupDto.last_name) {
      return await this.usersService.byName(
        signupDto.first_name,
        signupDto.last_name,
      );
    }
    else {
      throw new NotFoundException({
        status: 404,
        message: 'User information required to find user',
      });
    }
  }

  
  @ApiResponse({
    status: 200,
    description: 'Returns an array of users',
    type: [SignupResponse],
  })
  @Get('usersList')
  async list(): Promise<SignupResponse[]> {
    return await this.usersService.list();
  }
}
