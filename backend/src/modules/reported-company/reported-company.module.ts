import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';
import { ReportedCompanyIndexService } from './service/reported-company-index.service';
import { ReportedCompanyFindAllRepository } from './repositories/reported-company-find-all.repository';
import { ReportedCompanyController } from './reported-company.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ReportedCompanyController],
  providers: [
    ReportedCompanyIndexQuery,
    ReportedCompanyIndexService,
    ReportedCompanyFindAllRepository,
  ],
  exports: [ReportedCompanyIndexService, ReportedCompanyFindAllRepository],
})
export class ReportedCompanyModule {}
