/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignupController } from '../../../src/controllers/signup/signup.controller';
import { SignupService } from '../../../src/services/signup/signup.service';
import { User } from '../../../src/models/user/user.entity';

describe('SignupController', () => {
  let signupController: SignupController;
  let signupService: SignupService;

  beforeEach(() => {
    signupService = new SignupService();
    signupController = new SignupController(signupService);
  });

  describe('signup', () => {
    it('should handle signup requests successfully and return the expected response', async () => {
      const user: User = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'secret',
        id: '', // Agregar esta propiedad para que coincida con la interfaz de usuario en src/models/user/user.entity
        first_name: 'John',
        last_name: 'Doe',
        role: 'user',
        setDefaultRole: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
        is_active: false,
        created_at: undefined,
        updated_at: undefined
      };

      const result: User = {
        name: user.name,
        email: user.email,
        id: '',
        first_name: 'John',
        last_name: 'Doe',
        role: 'user',
        setDefaultRole: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
        password: '',
        is_active: false,
        created_at: undefined,
        updated_at: undefined
      };

      jest.spyOn(signupService, 'signup').mockImplementation(() => Promise.resolve(result));

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      const response = await signupController.signup(res, user);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(result);
    });

    it('should handle signup requests with invalid data', async () => {
      const user: User = {
        name: '',
        email: 'invalid-email',
        password: '',
        id: '',
        first_name: '',
        last_name: '',
        role: '',
        setDefaultRole: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
        is_active: false,
        created_at: undefined,
        updated_at: undefined
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      const response = await signupController.signup(res, user);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        errors: {
          name: ['El nombre no puede estar vacío'],
          email: ['La dirección de correo electrónico no es válida'],
          password: ['La contraseña no puede estar vacía'],
        },
      });
    });
  });
});