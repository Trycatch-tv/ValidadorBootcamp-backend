// import { passwordHelper } from './../../utils/crypto/crypto.utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { UserEntity } from 'src/models/user/user.entity';
import { SignupResponse } from 'src/responses/users/signup.response';
import { compareHash } from 'src/utils/crypto/crypto.utils';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(signupDto: SignupDto): Promise<SignupResponse> {
    const user = new UserEntity();
    user.first_name = signupDto.first_name;
    user.last_name = signupDto.last_name;
    user.email = signupDto.email;
    user.password = signupDto.password;

    const savedUser = await this.userRepository.save(user);

    const response: SignupResponse = {
      id: savedUser.id,
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      email: savedUser.email,
      role: savedUser.role,
    };

    return response;
  }

  // TODO: Implementar la validación del usuario usando un token.
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
    // Usa un objeto de proyección para seleccionar datos de usuario específicos
    // Esto protege la información confidencial y cumple con las pautas de seguridad
    const projection = {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true,
      is_active: true,
      created_at: true,
      updated_at: true,
    };
    const users = await this.userRepository.find({
      select: projection,
      where: { is_active: true },
    });
    // const response = new Array<GetUsersResponse>();
    // users.forEach((user) => {
    //   const signupResponse = new Object() as GetUsersResponse;
    //   signupResponse.id = user.id;
    //   signupResponse.first_name = user.first_name;
    //   signupResponse.last_name = user.last_name;
    //   signupResponse.email = user.email;
    //   signupResponse.role = user.role;
    //   response.push(signupResponse);
    // });
    return users;
  }
}
