import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ReportedCompany } from '@shared/entities/reported-company.entity';
import { ReportedCompanyCriteria } from '../reported-company.interface';

@Injectable()
export class ReportedCompanyFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where?: ReportedCompanyCriteria): Promise<ReportedCompany[]> {
    const result = await this.prismaService.reportedCompany.findMany({
      where: where ? { ...where, deletedAt: null } : { deletedAt: null },
    });

    return ReportedCompany.fromArray(result);
  }
}
