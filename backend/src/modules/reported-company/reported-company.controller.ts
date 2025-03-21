import { Controller, Get, Post, Query } from '@nestjs/common';
import { ReportedCompanyIndexService } from './service/reported-company-index.service';
import {
  ReportedCompanyCreateDto,
  ReportedCompanyIndexServiceDto,
  ReportedCompanySearchDto,
} from './reported-company.dto';
import { HasRoles } from '@shared/decorators/user-roles.decorator';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { ReportedCompanyCreateService } from './service/reported-company-create.service';
import { ReportedCompanySearchService } from './service/reported-company-search.service';

@Controller('companies')
export class ReportedCompanyController {
  constructor(
    private readonly reportedCompanyIndexService: ReportedCompanyIndexService,
    private readonly reportedCompanyCreateService: ReportedCompanyCreateService,
    private readonly reportedCompanySearchService: ReportedCompanySearchService,
  ) {}

  @Get()
  async index(@Query() params: ReportedCompanyIndexServiceDto) {
    return await this.reportedCompanyIndexService.execute({
      id: params.from || 0,
    });
  }

  @Get('search')
  async search(
    @Query() params: ReportedCompanySearchDto,
  ): Promise<{ id: number; name: string }[]> {
    const result = await this.reportedCompanySearchService.execute({
      name: params.search,
    });

    return result;
  }

  @HasRoles(Roles.Admin)
  @Post()
  async create(params: ReportedCompanyCreateDto) {
    return await this.reportedCompanyCreateService.execute(params);
  }
}
