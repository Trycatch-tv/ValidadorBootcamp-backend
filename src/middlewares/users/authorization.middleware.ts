import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationAsyncToken } from 'src/utils/JWT/jwt.utils';

@Injectable()
export class UserAuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      // AuthorizationAsyncToken returns the payload of the token
      await AuthorizationAsyncToken(this.jwtService,req);
      next();
    } catch (err) {
      if (
        err.name === 'UnauthorizedException' ||
        err.name === 'JsonWebTokenError'
      ) {
        throw new UnauthorizedException(err.message);
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }
}
