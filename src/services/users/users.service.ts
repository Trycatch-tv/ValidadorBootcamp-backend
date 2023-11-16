import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user/user.entity';
import { genereUUID } from 'src/utils/uuid/uuid.utils';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(user: User): Promise<User> {
    user.id = genereUUID();
    // user.role = 'user';
    return await this.userRepository.save(user);
  }
}
