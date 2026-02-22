import { PassportService } from "@cinema-project-lynx/passport";
import { Injectable, type CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly passport: PassportService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) 
      throw new UnauthorizedException('Token not provided');

    const result = this.passport.verifyToken(token);
    if (!result.valid) throw new UnauthorizedException(result.reason);

    request.user = { id: result.userId };

    return true;
  }

  private extractToken(request: Request): string {
    const header = request.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) 
      throw new UnauthorizedException('Authorization header missing');

    const token = header.replace(/^Bearer\s+/i, '').trim();

    return token
  }
}