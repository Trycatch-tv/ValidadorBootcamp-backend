export const extractTokenFromHeader =  async (
    req: Request,
): Promise<string | undefined> =>{
    const [type, token] = req.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}