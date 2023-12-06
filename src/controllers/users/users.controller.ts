import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { User } from 'src/models/user/user.entity';
import { SignupResponse } from 'src/responses/users/signup.response';
import { UsersService } from 'src/services/users/users.service';

@Controller()
export class UsersController {
  private readonly usersService: UsersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get('/')
  healthCheck() {
    return 'ok';
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<SignupResponse> {
    return await this.usersService.signup(signupDto);
  }

  @Get('list')
  async list(): Promise<User[]> {
    return await this.usersService.list();
  }
}
