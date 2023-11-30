import { Controller, Post, Body, Response } from '@nestjs/common';
import { SignupService } from '../../services/signup/signup.service';
import { User } from '../../../src/models/user/user.entity';

@Controller('signup')
export class SignupController {
    constructor(private readonly signupService: SignupService) {}
    
@Post()
    async signup(@Response() res: Response<User>, @Body() user: User): Promise<void> {
      const result = await this.signupService.signup(user);
      return res.status(200).send(result);
    }
  }