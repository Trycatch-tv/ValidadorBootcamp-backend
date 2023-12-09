import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/dtos/users/signup.dto';
import { User } from 'src/models/user/user.entity';
import { SignupResponse } from 'src/responses/users/signup.response';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
  @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignupDto): Promise<SignupResponse> {
    const user = new User();
    user.firstName = signupDto.firstName; // Coincidencias SignupDto
    user.lastName = signupDto.lastName; // Coincidencias SignupDto
    user.email = signupDto.email;
    user.password = signupDto.password;

    const savedUser = await this.userRepository.save(user);

    const response: SignupResponse = {
      id: savedUser.id,
      firstName: savedUser.firstName, // Coincidencias SignupDto
      lastName: savedUser.lastName, // Coincidencias SignupDto
      email: savedUser.email,
      role: savedUser.role,
    };

    return response;
  }

  // TODO: Implementar la validación del usuario usando un token.

  async list(): Promise<User[]> {
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

    return await this.userRepository.find({
      select: projection,
      where: { isActive: true },
    });
  }
}
