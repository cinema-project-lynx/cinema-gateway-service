import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ROLES_KEY } from '../decorators';
import { CanActivate, Injectable } from '@nestjs/common';
import { AccountClientGrpc } from 'src/modules/account/account.grpc';
import { Role } from '@cinema-project-lynx/contracts/gen/account';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly accountClient: AccountClientGrpc,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('requiredRoles', requiredRoles);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user) throw new ForbiddenException('User context missing');

    const account = await this.accountClient.getAccount({ id: user.id });

    if (!account) throw new ForbiddenException('Account not found');
 
    if (!requiredRoles.includes(account.role))
      throw new ForbiddenException('User does not have the required role');

    return true;
  }
}
