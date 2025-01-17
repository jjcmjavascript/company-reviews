import { Body, Controller } from '@nestjs/common';
import { ReportedCompanyIndexService } from './service/reported-company-index.service';

@Controller()
export class ReportedCompanyController {
  constructor(
    private readonly reportedCompanyIndexService: ReportedCompanyIndexService,
  ) {}

  async index(@Body() params) {
    return await this.reportedCompanyIndexService.execute(params);
  }
}
