import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ReportedCompanyPaginatedQueryService } from './service/reported-company-index.service';
import {
  ReportedCompanyCreateDto,
  ReportedCompanyPaginatedQueryServiceDto,
  ReportedCompanyListServiceDto,
} from './reported-company.dto';
import { HasRoles } from '@shared/decorators/user-roles.decorator';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { ReportedCompanyCreateService } from './service/reported-company-create.service';
import { ReportedCompanySearchService } from './service/reported-company-search.service';
import { ReportedCompanyFindService } from './service/reported-company-find.service';

@Controller('companies')
export class ReportedCompanyController {
  constructor(
    private readonly reportedCompanyIndexService: ReportedCompanyPaginatedQueryService,
    private readonly reportedCompanyCreateService: ReportedCompanyCreateService,
    private readonly reportedCompanySearchService: ReportedCompanySearchService,
    private readonly reportedCompanyFindService: ReportedCompanyFindService,
  ) {}

  @Get()
  async index(@Query() params: ReportedCompanyPaginatedQueryServiceDto) {
    return await this.reportedCompanySearchService.execute(params);
  }

  @HasRoles(Roles.Admin)
  @Post()
  async create(params: ReportedCompanyCreateDto) {
    return await this.reportedCompanyCreateService.execute(params);
  }

  @Get('paginated')
  async list(@Query() params: ReportedCompanyListServiceDto) {
    return await this.reportedCompanyIndexService.execute({
      id: params.from || 0,
    });
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.reportedCompanyFindService.execute({ id });
  }
}
