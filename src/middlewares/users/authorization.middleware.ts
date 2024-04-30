import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserAuthorizationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        //  Logic to check if the user is authorized
        next();
    }
}
