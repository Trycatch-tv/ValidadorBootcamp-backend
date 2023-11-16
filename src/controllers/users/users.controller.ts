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
    const newUser = new User();
    newUser.email = user.email;
    newUser.first_name = user.first_name;
    newUser.last_name = user.last_name;
    newUser.password = user.password;

    return await this.usersService.signup(newUser);
  }
}
