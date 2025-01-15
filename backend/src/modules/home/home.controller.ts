import { Controller, Get } from '@nestjs/common';
import { ReportedCompanyFindAllRepository } from '../reported-company/repositories/reported-company-find-all.repository';
import { HomeIndexResponse } from './home.interfaces';
import { HomeIndexService } from './service/home-index.service';

@Controller()
export class HomeController {
  constructor(
    private readonly indexService: HomeIndexService,
    private readonly reportedCompanyFindAllRepository: ReportedCompanyFindAllRepository,
  ) {}

  @Get()
  async index(): Promise<HomeIndexResponse[]> {
    const reportedCompanies =
      await this.reportedCompanyFindAllRepository.execute();

    const indexService = this.indexService.execute(reportedCompanies);

    return indexService;
  }
}
