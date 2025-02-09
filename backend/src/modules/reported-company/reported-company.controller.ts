import { Controller, Get, Query } from '@nestjs/common';
import { ReportedCompanyIndexService } from './service/reported-company-index.service';
import { ReportedCompanyIndexServiceDto } from './reported-company.dto';
import { Public } from '@shared/decorators/public.decorator';

@Controller('companies')
export class ReportedCompanyController {
  constructor(
    private readonly reportedCompanyIndexService: ReportedCompanyIndexService,
  ) {}

  @Public()
  @Get()
  async index(@Query() params: ReportedCompanyIndexServiceDto) {
    return await this.reportedCompanyIndexService.execute({
      id: params.from || 0,
    });
  }
}
