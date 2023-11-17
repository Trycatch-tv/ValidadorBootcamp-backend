import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/models/user/user.entity';
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
  async signup(@Body() user: User) {
    return await this.usersService.signup(user);
  }
}
