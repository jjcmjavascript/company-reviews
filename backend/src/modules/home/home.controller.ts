import { Controller, Get } from '@nestjs/common';
import { HomeIndexResponse } from './home.interfaces';
import { HomeIndexService } from './service/home-index.service';
import { HasRoles } from '@shared/decorators/user-roles.decorator';
import { Roles } from '@shared/services/permission/types/roles.enum';

@Controller('/')
export class HomeController {
  constructor(private readonly homeRepository: HomeIndexService) {}

  @Get()
  @HasRoles(Roles.Admin)
  async index(): Promise<HomeIndexResponse[]> {
    const result = await this.homeRepository.execute();

    return result;
  }
}
