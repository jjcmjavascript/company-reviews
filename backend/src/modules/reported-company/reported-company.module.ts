import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';
import { ReportedCompanyIndexService } from './service/reported-company-index.service';
import { ReportedCompanyFindAllRepository } from './repositories/reported-company-find-all.repository';
import { ReportedCompanyController } from './reported-company.controller';
import { ReportedCompanyCreateService } from './service/reported-company-create.service';
import { ReportedCompanyCreateRepository } from './repositories/reported-company-create.repository';
import { ReportedCompanySearchService } from './service/reported-company-search.service';
import { ReportedCompanySearchRepository } from './repositories/reported-company-search.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ReportedCompanyController],
  providers: [
    ReportedCompanyIndexQuery,
    ReportedCompanyFindAllRepository,
    ReportedCompanyCreateRepository,
    ReportedCompanySearchRepository,

    ReportedCompanyIndexService,
    ReportedCompanyCreateService,
    ReportedCompanySearchService,
  ],
  exports: [ReportedCompanyIndexService, ReportedCompanyFindAllRepository],
})
export class ReportedCompanyModule {}
