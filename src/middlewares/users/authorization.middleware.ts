import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: () => void) {
    const token = await this.extractTokenFromHeader(req);
    if (!(token)) throw new UnauthorizedException('No token provided');
    try {
        await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
            algorithms: ['HS256'],
        });
        next();
    } catch (err) {
        if(err instanceof UnauthorizedException || err instanceof JsonWebTokenError)
            throw new UnauthorizedException(err.message);
        else
            throw new InternalServerErrorException(err.message);
    }
  }

  private async extractTokenFromHeader(
    req: Request,
  ): Promise<string | undefined> {
    const [type, token] = req.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
