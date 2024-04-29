import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserAuthenticationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('UserAuthencationMiddleware');
        next();
    }
}
