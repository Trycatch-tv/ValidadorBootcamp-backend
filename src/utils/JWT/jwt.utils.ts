import { Algorithm } from 'jsonwebtoken';
import {UnauthorizedException} from '@nestjs/common';
import {JwtService } from '@nestjs/jwt';
export const extractTokenFromHeader =  async (
    req: Request,
): Promise<string | undefined> =>{
    const [type, token] = req.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}

export const AuthorizationAsyncToken = async (
    jwtService: JwtService,
    req: Request
) => {
    const token = await extractTokenFromHeader(req);
    if (!token) throw new UnauthorizedException('No token provided');
    return verifyAsyncToken(jwtService,token);
}

export const verifyAsyncToken= async(
    jwtService: JwtService,
    token: string,
    algorithm?: string,
    secret: string = process.env.JWT_SECRET,
) => {
    const algorithms: Algorithm[] = algorithm ? [algorithm as Algorithm] : ['HS256'];
    return jwtService.verifyAsync(token, {
        secret: secret,
        algorithms: algorithms,
    });
}