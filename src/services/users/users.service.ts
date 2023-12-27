// import { passwordHelper } from './../../utils/crypto/crypto.utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user/user.entity';
import { compareHash } from 'src/utils/crypto/crypto.utils';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
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
      if (!users.length)
        throw new HttpException('No hay usuarios', HttpStatus.NOT_FOUND);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id, is_active: true },
      });
      delete user.password;
      delete user.isLogedIn;
      return user;
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async removeOne(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id, is_active: true },
      });
      user.is_active = false;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async updateOne(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const userToUpdate = await this.userRepository.findOneOrFail({
        where: { id, is_active: true },
      });
      const updatedUser = await this.userRepository.save({
        ...userToUpdate,
        ...user,
      });
      delete updatedUser.password;
      delete updatedUser.isLogedIn;
      return updatedUser;
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async createOne(user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      user.password = Math.random().toString(36).substring(2);
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException('Error al crear usuario', HttpStatus.BAD_REQUEST);
    }
  }

  async search(key: string): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({
        where: [
          { first_name: ILike(`%${key}%`), is_active: true },
          { last_name: ILike(`%${key}%`), is_active: true },
          { email: ILike(`%${key}%`), is_active: true },
        ],
      });
      if (!users.length)
        throw new HttpException('No hay usuarios', HttpStatus.NOT_FOUND);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async signup(user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
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
}
