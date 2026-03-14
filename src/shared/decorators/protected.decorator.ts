import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards';
import { RolesGuard } from '../guards';
import { Roles } from './roles.decorator';
import { Role } from '@cinema-project-lynx/contracts/gen/account';

export const Protected = (...roles: Role[]) => {
  if (roles.length === 0) return applyDecorators(UseGuards(AuthGuard));
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
