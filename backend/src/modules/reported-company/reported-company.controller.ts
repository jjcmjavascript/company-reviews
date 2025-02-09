import { Controller, Get, Post, Query } from '@nestjs/common';
import { ReportedCompanyIndexService } from './service/reported-company-index.service';
import {
  ReportedCompanyCreateDto,
  ReportedCompanyIndexServiceDto,
} from './reported-company.dto';
import { Public } from '@shared/decorators/public.decorator';
import { HasRoles } from '@shared/decorators/user-roles.decorator';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { ReportedCompanyCreateService } from './service/reported-company-create.service';

@Controller('companies')
export class ReportedCompanyController {
  constructor(
    private readonly reportedCompanyIndexService: ReportedCompanyIndexService,
    private readonly reportedCompanyCreateService: ReportedCompanyCreateService,
  ) {}

  @Public()
  @Get()
  async index(@Query() params: ReportedCompanyIndexServiceDto) {
    return await this.reportedCompanyIndexService.execute({
      id: params.from || 0,
    });
  }

  @HasRoles(Roles.Admin)
  @Post()
  async create(params: ReportedCompanyCreateDto) {
    return await this.reportedCompanyCreateService.execute(params);
  }
}
