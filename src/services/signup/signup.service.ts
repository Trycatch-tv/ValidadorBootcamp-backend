/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../../../src/models/user/user.entity";

export class SignupService {
    async signup(user: User): Promise<User> {
      if (!isValidEmail(user.email)) {
        throw new Error('Invalid email format');
      }
  
      // Guarda el usuario en la base de datos
  
      return user;
    }
  }
  
  function isValidEmail(email: string): boolean {
    // Implementar lógica de validación de correo electrónico
    return true;
  }