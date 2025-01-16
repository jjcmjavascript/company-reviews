import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ReportedCompanyFindAllRepository } from './repositories/reported-company-find-all.repository';

@Module({
  imports: [PrismaModule],
  providers: [ReportedCompanyFindAllRepository],
  exports: [ReportedCompanyFindAllRepository],
})
export class ReportedCompanyModule {}
