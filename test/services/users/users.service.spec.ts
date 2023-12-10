import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../src/services/users/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should signup a user successfully', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'secret',
    };

    const expectedResponse = {
      name: user.name,
      email: user.email,
      id: '',
    };

    const result = await service.signup(user);

    expect(result).toEqual(expectedResponse);
  });

  it('should signup a user with invalid data', async () => {
    const user = {
      name: '',
      email: 'invalid-email',
      password: '',
    };

    const expectedErrors = {
      name: ['El nombre no puede estar vacío'],
      email: ['La dirección de correo electrónico no es válida'],
      password: ['La contraseña no puede estar vacía'],
    };

    const errors = await service.signup(user);

    expect(errors).toEqual(expectedErrors);
  });
});
