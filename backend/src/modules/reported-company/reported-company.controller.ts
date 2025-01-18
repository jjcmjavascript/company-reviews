import { Controller, Query } from '@nestjs/common';
import { ReportedCompanyIndexService } from './service/reported-company-index.service';
import { ReportedCompanyIndexServiceDto } from './reported-company.interfaces';

@Controller()
export class ReportedCompanyController {
  constructor(
    private readonly reportedCompanyIndexService: ReportedCompanyIndexService,
  ) {}

  async index(@Query() params: ReportedCompanyIndexServiceDto) {
    return await this.reportedCompanyIndexService.execute({
      id: params.from || 0,
    });
  }
}
