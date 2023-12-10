import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/models/user/user.entity';
import { SignupResponse } from 'src/responses/users/signup.response';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Response } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/services/users/users.service';

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

@ApiTags('Users')
@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  @ApiResponse({
    status: 200,
    description: 'Returns an array of users',
    type: [SignupResponse]
  })
  @Get('/')
  healthCheck(): string {
    return 'ok';
  getUsers(): Promise<SignupResponse[]> {
    return this.usersService.getUsers();
  }
  
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: SignupResponse,
  })
  @Post('signup')
async signup(@Body() signupDto: SignupDto, @Response() res: Response): Promise<any> {
  try {
    const user: User = {
      name: signupDto.name,
      email: signupDto.email,
      password: signupDto.password,
      // Set any default values for missing properties
      id: '',
      role: 'user',
      is_active: false,
      setDefaultRole: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      first_name: '',
      last_name: '',
      created_at: undefined,
      updated_at: undefined
    };
    const registeredUser = await this.signupService.signup(user);
    const response: SignupResponse = {
      name: registeredUser.name,
      email: registeredUser.email,
      id: registeredUser.id,
    };
    return res.status(HttpStatus.CREATED).send(response);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send({ errors: error.errors });

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

    return await this.usersService.list();

  async signUp(@Body() signupDto: SignupDto): Promise<SignupResponse> {
    return await this.usersService.signup(signupDto);
  }

  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'Sign in successful',
    type: SigninResponse,
  })
  @Get('signin')
  async signIn(@Body() signupDto: SignupDto): Promise<SigninResponse> {
    return await this.usersService.signin(signupDto);

    // Implementar un filtrado adecuado de la lista de usuarios para evitar revelar información privada
    // Considere usar un objeto de proyección para especificar los datos que se devolverán
    // O implementar un método separado para recuperar información de usuario específica
    // Esto garantiza la privacidad de los datos del usuario y cumple con las pautas de seguridad.
    const users = await this.usersService.list();
    return users;
>>>>>>> Orliluq/17-be-users-user-info
  }
}

}};

