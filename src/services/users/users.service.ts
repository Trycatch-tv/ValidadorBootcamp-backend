import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { User } from 'src/models/user/user.entity';
import { SignupResponse } from 'src/responses/users/signup.response';
import { Repository } from 'typeorm';
import { SigninResponse } from 'src/responses/users/signin.response';
import { compareHash, generateHash } from 'src/utils/crypto/crypto.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async signUpUser(signupDto: SignupDto): Promise<SignupResponse> {
    try {
      if (
        signupDto.email == null ||
        signupDto.email == undefined ||
        signupDto.email == ''
      ) {
        throw new NotFoundException();
      }
      const user = new User();
      let signupResponse = new Object() as SignupResponse;
      user.first_name = signupDto.first_name;
      user.last_name = signupDto.last_name;
      user.email = signupDto.email;
      user.password = await generateHash(signupDto.password);
      if (signupDto.role) user.role = signupDto.role;
      signupResponse = await this.saveUser(user);      
      return signupResponse;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async modUser(signupDto: SignupDto): Promise<SignupResponse> {
    try {
      if (
        signupDto.email == null ||
        signupDto.email == undefined ||
        signupDto.email == ''
      ) {
        throw new NotFoundException();
      }
      const user = new User();
      let signupResponse = new Object() as SignupResponse;
      if (
        signupDto.id == null ||
        signupDto.id == undefined ||
        signupDto.id == ''
      ) {
        signupResponse = await this.byEmail(signupDto.email);
        if (signupResponse.id != null) {
          user.id = signupResponse.id;
        }
      } else {
        user.id = signupDto.id;
      }
      user.first_name = signupDto.first_name
        ? signupDto.first_name
        : signupResponse.first_name;
      user.last_name = signupDto.last_name
        ? signupDto.last_name
        : signupResponse.last_name;
      user.email = signupDto.email;
      if (signupDto.password)
        user.password = await generateHash(signupDto.password);
      else user.password = signupResponse.password;
      if (signupDto.role) user.role = signupDto.role;

      signupResponse = await this.updateUser(user);
      return signupResponse;
    } catch (error) {
      throw new NotFoundException();
    }
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
      signinResponse.isLogedIn = await compareHash(
        user.password,
        newUser.password,
      );
      //TODO: Pendiente agregar validación del usuario mediante token
    } catch (error) {}
    if (signinResponse.id == null) {
      return null;
    }
    return signinResponse;
  }

  async getUsers(): Promise<SignupResponse[]> {
    const users = await this.userRepository.findBy({ is_active: true });
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

  async list(): Promise<User[]> {
    try {
      return await this.userRepository.findBy({ is_active: true });
    } catch (error) {
      throw error;
    }
  }

  async byEmail(_email: string): Promise<SignupResponse> {
    const sR = new Object() as SignupResponse;
    try {
      const newUser = await this.userRepository.findOneByOrFail({
        email: _email,
      });
      sR.id = newUser.id;
      sR.email = newUser.email;
      sR.role = newUser.role;
      sR.first_name = newUser.first_name;
      sR.last_name = newUser.last_name;
      sR.password = newUser.password;
    } catch (error) {
      const msg = error.message;
      throw new NotFoundException({
        status: 404,
        message: msg,
      });
    }
    return sR;
  }

  async byID(_id: string): Promise<SignupResponse> {
    const sR = new Object() as SignupResponse;
    try {
      const newUser = await this.userRepository.findOneByOrFail({
        id: _id,
      });
      sR.id = newUser.id;
      sR.email = newUser.email;
      sR.role = newUser.role;
      sR.first_name = newUser.first_name;
      sR.last_name = newUser.last_name;
      sR.password = newUser.password;
    } catch (error) {
      const msg = error.message;
      throw new NotFoundException({
        status: 404,
        message: msg,
      });
    }
    return sR;
  }

  async byName(
    _first_name: string,
    _last_name: string,
  ): Promise<SignupResponse> {
    const sR = new Object() as SignupResponse;
    try {
      const newUser = await this.userRepository.findOneByOrFail({
        first_name: _first_name,
        last_name: _last_name,
      });
      sR.id = newUser.id;
      sR.email = newUser.email;
      sR.role = newUser.role;
      sR.first_name = newUser.first_name;
      sR.last_name = newUser.last_name;
      sR.password = newUser.password;
    } catch (error) {
      const msg = error.message;
      throw new NotFoundException({
        status: 404,
        message: msg,
      });
    }
    return sR;
  }

  private async updateUser(user: User): Promise<SignupResponse> {
    try {
      const signupResponse = new Object() as SignupResponse;
      const ret = await this.userRepository.update(
        { id: user.id },
        {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      );

      if (ret.affected > 0) {
        signupResponse.id = user.id;
        signupResponse.first_name = user.first_name;
        signupResponse.last_name = user.last_name;
        signupResponse.email = user.email;
        signupResponse.role = user.role;
      }
      return signupResponse;
    } catch (error) {
      throw error;
    }
  }

  private async saveUser(user: User): Promise<SignupResponse> {
    try {
      const signupResponse = new Object() as SignupResponse;
      const ret = await this.userRepository.save(user);
      if (ret) {
        signupResponse.id = ret.id;
        signupResponse.first_name = ret.first_name;
        signupResponse.last_name = ret.last_name;
        signupResponse.email = ret.email;
        signupResponse.role = ret.role;
      }
      return signupResponse;
    } catch (error) {
      throw error;
    }
  }
}
