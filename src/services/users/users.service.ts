// import { passwordHelper } from './../../utils/crypto/crypto.utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { UserEntity } from 'src/models/user/user.entity';
import { SigninResponse } from 'src/responses/users/signin.response';
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

  async signin(signupDto: SignupDto): Promise<SigninResponse> {
    const user = new UserEntity();
    user.email = signupDto.email;
    user.password = signupDto.password;
    const signinResponse = new Object() as SigninResponse;
    try {
      const newUser = await this.userRepository.findOneByOrFail({
        email: user.email,
      });
      signinResponse.id = newUser.id;
      signinResponse.email = newUser.email;
      signinResponse.role = newUser.role;
      signinResponse.isLogedIn = await compareHash(
        user.password,
        newUser.password,
      );
    } catch (error) {}
    return signinResponse;
  }

  async getUsers(): Promise<SignupResponse[]> {
    // Usa un objeto de proyección para seleccionar datos de usuario específicos
    // Esto protege la información confidencial y cumple con las pautas de seguridad
    const projection = {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    };
    const users = await this.userRepository.find({
      select: projection,
      where: { isActive: true },
    });
    const response = new Array<SignupResponse>();
    users.forEach((user) => {
      const signupResponse = new Object() as SignupResponse;
      signupResponse.id = user.id;
      signupResponse.first_name = user.first_name;
      signupResponse.last_name = user.last_name;
      signupResponse.email = user.email;
      signupResponse.role = user.role;
      response.push(signupResponse);
    });
    return response;
  }
}
