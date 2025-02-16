import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { UserRolesFindOneRepository } from './repositories/user-roles-find-one.repository';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly useRoleFindOneRepository: UserRolesFindOneRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Roles[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!roles) {
      return true;
    }

    if (!user) {
      return false;
    }

    const userRoles = await this.useRoleFindOneRepository.execute(user.id);

    if (!userRoles || !roles.includes(userRoles.toPrimitive().name as Roles)) {
      return false;
    }

    return true;
  }
}
