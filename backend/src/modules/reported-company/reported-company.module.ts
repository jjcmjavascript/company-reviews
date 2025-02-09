import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';
import { ReportedCompanyIndexService } from './service/reported-company-index.service';
import { ReportedCompanyFindAllRepository } from './repositories/reported-company-find-all.repository';
import { ReportedCompanyController } from './reported-company.controller';
import { ReportedCompanyCreateService } from './service/reported-company-create.service';
import { ReportedCompanyCreateRepository } from './repositories/reported-company-create.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ReportedCompanyController],
  providers: [
    ReportedCompanyIndexQuery,
    ReportedCompanyFindAllRepository,
    ReportedCompanyCreateRepository,
    ReportedCompanyIndexService,
    ReportedCompanyCreateService,
  ],
  exports: [ReportedCompanyIndexService, ReportedCompanyFindAllRepository],
})
export class ReportedCompanyModule {}
