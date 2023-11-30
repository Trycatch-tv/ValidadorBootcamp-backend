import { User } from 'src/models/user/user.entity';
import { SignupService } from '../../../src/services/signup/signup.service';

describe('SignupService', () => {
  let signupService: SignupService;

  beforeEach(() => {
    signupService = new SignupService();
  });

  it('should be able to sign up a new user', async () => {
    const user: User = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'secret',
      id: '', // Añadir esta propiedad
      first_name: '', // Añadir esta propiedad
      last_name: '', // Añadir esta propiedad
      role: '', // Añadir esta propiedad
      setDefaultRole: () => Promise.resolve(), // Añadir esta propiedad
      is_active: false, // Añadir esta propiedad
      created_at: new Date(), // Añadir esta propiedad
      updated_at: new Date(), // Añadir esta propiedad
    };

    const result = await signupService.signup(user);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', user.name);
    expect(result).toHaveProperty('email', user.email);
  });

  it('should throw an error when signing up with an invalid email', async () => {
    const user = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'secret',
    };

    await expect(signupService.signup(user)).rejects.toThrow('Invalid email format');
  });
});