/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { User } from 'src/models/user/user.entity';
import { UsersService } from 'src/services/users/users.service';
import { SignupService } from 'src/services/signup/signup.service';

// Interfaces para SignupDto y SignupResponse
export interface SignupDto {
  name: string;
  email: string;
  password: string;

  // Todas las propiedades de la interfaz de usuario para una seguridad de tipos completa
  id: string;
  role: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  created_at: Date | undefined;
  updated_at: Date | undefined;
}

interface SignupResponse {
  id: string;
  firstName: string; // Coincidencias SignupDto
  lastName: string; // Coincidencias SignupDto
  email: string;
  role: string;
}

@Controller()
export class UsersController {
  // Inyectar UsersService y SignupService
  constructor(
    public readonly signupService: SignupService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  healthCheck(): string {
    return 'ok';
  }

  // Utilice SignupService y devuelva SignupResponse directamente
  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto,
    @new Response() res: Response,
  ): Promise<any> {
    try {
      const registeredUser = await this.signupService.signup(signupDto);
      return res.status(HttpStatus.CREATED).send(registeredUser);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({ errors: error.errors });
    }
  }

  // Obtenga una lista de usuarios que utilizan UsersService con consideraciones de seguridad
  @Get('list')
  async list(): Promise<User[]> {
    // Implementar un filtrado adecuado de la lista de usuarios para evitar revelar información privada
    // Considere usar un objeto de proyección para especificar los datos que se devolverán
    // O implementar un método separado para recuperar información de usuario específica
    // Esto garantiza la privacidad de los datos del usuario y cumple con las pautas de seguridad.
    const users = await this.usersService.list();
    return users;
  }
}
