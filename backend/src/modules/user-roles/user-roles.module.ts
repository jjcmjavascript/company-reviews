import { Module } from '@nestjs/common';
import { UserRolesCreateRepository } from './user-roles-create.repository';
import { UserRolesFindOneRepository } from './user-roles-find-one.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UserRolesCreateRepository, UserRolesFindOneRepository],
  exports: [UserRolesCreateRepository, UserRolesFindOneRepository],
})
export class UserRolesModule {}
