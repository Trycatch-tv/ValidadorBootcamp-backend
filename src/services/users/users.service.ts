// import { passwordHelper } from './../../utils/crypto/crypto.utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { User } from 'src/models/user/user.entity';
import { SigninResponse } from 'src/responses/users/signin.response';
import { SignupResponse } from 'src/responses/users/signup.response';
import { compareHash } from 'src/utils/crypto/crypto.utils';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignupDto): Promise<SignupResponse> {
    const user = new User();
    user.first_name = signupDto.first_name;
    user.last_name = signupDto.last_name;
    user.email = signupDto.email;
    user.password = signupDto.password;

    const newUser = await this.userRepository.save(user);

    const signupResponse = new Object() as SignupResponse;
    signupResponse.id = newUser.id;
    signupResponse.first_name = newUser.first_name;
    signupResponse.last_name = newUser.last_name;
    signupResponse.email = newUser.email;
    signupResponse.role = newUser.role;
    return signupResponse;
  }

  // TODO: Pendiente agregar validación del usuario mediante token
  async list(): Promise<User[]> {
    try {
      return await this.userRepository.findBy({ is_active: true });
    } catch (error) {
      throw error;
    }
  async signin(signupDto: SignupDto): Promise<SigninResponse> {
    const user = new User();
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
      signinResponse.isLogedIn = await compareHash(user.password, newUser.password);
    } catch (error) {}
    return signinResponse;
  }

  async getUsers(): Promise<SignupResponse[]> {
    const users = await this.userRepository.find();
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
