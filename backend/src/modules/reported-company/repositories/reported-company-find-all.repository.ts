import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ReportedCompany } from '@shared/entities/reported-company.entity';
import { ReportedCompanyCriteria } from '../reported-company.interface';

@Injectable()
export class ReportedCompanyFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where?: ReportedCompanyCriteria): Promise<ReportedCompany[]> {
    let result = null;

    if (where) {
      result = await this.prismaService.reportedCompany.findMany({
        where,
      });
    } else {
      result = await this.prismaService.reportedCompany.findMany();
    }

    return ReportedCompany.fromArray(result);
  }
}
