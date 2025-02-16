import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserCreateRepository } from './repositories/user-create.repository';
import { UserFindAllRepository } from './repositories/user-find-all.repository';
import { UserCreateDto } from './user.dto';
import { Public } from '@decorators/public.decorator';
import { UserFindOneRepository } from './repositories/user-find-one.repository';
import { arrayEntityToHash } from '@shared/helpers/array-entity-to-hash.helper';
import { HasRoles } from '@shared/decorators/user-roles.decorator';
import { Roles } from '@shared/services/permission/types/roles.enum';

@Controller('users')
export class UserController {
  constructor(
    private readonly findAllService: UserFindAllRepository,
    private readonly createService: UserCreateRepository,
    private readonly findOneService: UserFindOneRepository,
  ) {}

  @Get()
  @HasRoles(Roles.Admin)
  async findAll() {
    const users = await this.findAllService.execute();

    const normalizedUsers = arrayEntityToHash(users);

    return {
      users: normalizedUsers,
    };
  }

  @Public()
  @Post()
  async create(@Body() userDto: UserCreateDto) {
    const result = await this.createService.executeTransaction(
      userDto,
      Roles.User,
    );

    return result.toPrimitive();
  }

  @HasRoles(Roles.Admin)
  async createAdmin(@Body() userDto: UserCreateDto) {
    const result = await this.createService.executeTransaction(
      userDto,
      Roles.Admin,
    );

    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.findOneService.execute({ id });

    return user;
  }
}
