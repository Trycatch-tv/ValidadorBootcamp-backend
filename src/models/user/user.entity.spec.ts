import { User } from './user.entity';

describe('User entity', () => {
  it('should have a name property', () => {
    const user: User = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'secret',
        setDefaultRole: function (): Promise<void> {
            throw new Error('Function not implemented.');
        },
        id: '',
        first_name: '',
        last_name: '',
        role: '',
        is_active: false,
        created_at: undefined,
        updated_at: undefined
    };

    expect(user.name).toBe('John Doe');
  });

  it('should have an email property', () => {
    const user: User = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'secret',
        setDefaultRole: function (): Promise<void> {
            throw new Error('Function not implemented.');
        },
        id: '',
        first_name: '',
        last_name: '',
        role: '',
        is_active: false,
        created_at: undefined,
        updated_at: undefined
    };

    expect(user.email).toBe('johndoe@example.com');
  });

  it('should have a password property', () => {
    const user: User = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'secret',
        setDefaultRole: function (): Promise<void> {
            throw new Error('Function not implemented.');
        },
        id: '',
        first_name: '',
        last_name: '',
        role: '',
        is_active: false,
        created_at: undefined,
        updated_at: undefined
    };

    expect(user.password).toBe('secret');
  });
});