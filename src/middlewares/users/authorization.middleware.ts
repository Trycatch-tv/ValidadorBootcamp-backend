import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: () => void) {
    const token = this.extractTokenFromHeader(req);
    if (!(await token)) {
      throw new UnauthorizedException('No token provided');
    }
    const payload = this.jwtService.decode(await token);
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    next();
  }
  private async extractTokenFromHeader(
    req: Request,
  ): Promise<string | undefined> {
    const [type, token] = req.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
