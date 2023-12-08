import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../src/controllers/users/users.controller';
import { UsersService } from '../../../src/services/users/users.service';

describe('Users', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      
    controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('UsersController', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should handle signup requests successfully', async () => {
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

      jest.spyOn(service, 'signup').mockImplementation(() => Promise.resolve(expectedResponse));

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      await controller.signup(res, user);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expectedResponse);
    });

    it('should handle signup requests with invalid data', async () => {
      const user = {
        name: '',
        email: 'invalid-email',
        password: '',
      };
      const expectedErrors = {
        name: ['El nombre no puede estar vacío'],
        email: ['La dirección de correo electrónico no es válida'],
        password: ['La contraseña no puede estar vacío'],
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      await controller.signup(res, user);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ errors: expectedErrors });
    });
  });

  describe('UsersService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});