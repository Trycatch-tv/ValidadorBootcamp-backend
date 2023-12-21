// import { passwordHelper } from './../../utils/crypto/crypto.utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user/user.entity';
import { compareHash } from 'src/utils/crypto/crypto.utils';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async list(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.findBy({ is_active: true });
    } catch (error) {
      throw error;
    }
  }

  async signin(user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const newUser = await this.userRepository.findOneByOrFail({
        email: user.email,
      });
      newUser.isLogedIn = await compareHash(user.password, newUser.password);
      delete newUser.password;
      delete newUser.created_at;
      delete newUser.updated_at;
      return newUser;
    } catch (error) {
      throw Error('Error al iniciar sesión');
    }
  }

  async getUsers(): Promise<UserEntity[]> {
    try {
      const users = (
        await this.userRepository.find({
          where: { is_active: true },
        })
      ).map((user) => {
        delete user.password;
        delete user.isLogedIn;
        return user;
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
}
