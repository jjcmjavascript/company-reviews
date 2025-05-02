import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ReportedCompanyPaginatedQuery } from '@shared/services/queries/reported-company-index.query';
import { ReportedCompanyPaginatedQueryService } from './service/reported-company-index.service';
import { ReportedCompanyFindAllRepository } from './repositories/reported-company-find-all.repository';
import { ReportedCompanyController } from './reported-company.controller';
import { ReportedCompanyCreateService } from './service/reported-company-create.service';
import { ReportedCompanyCreateRepository } from './repositories/reported-company-create.repository';
import { ReportedCompanySearchService } from './service/reported-company-search.service';
import { ReportedCompanyFindService } from './service/reported-company-find.service';
import { ReportedCompanyFindOneByRepository } from './repositories/reported-company-find-one-by.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ReportedCompanyController],
  providers: [
    ReportedCompanyPaginatedQuery,
    ReportedCompanyFindAllRepository,
    ReportedCompanyCreateRepository,
    ReportedCompanyFindOneByRepository,
    ReportedCompanyPaginatedQueryService,
    ReportedCompanyFindService,
    ReportedCompanyCreateService,
    ReportedCompanySearchService,
  ],
  exports: [
    ReportedCompanyPaginatedQueryService,
    ReportedCompanyFindAllRepository,
  ],
})
export class ReportedCompanyModule {}
