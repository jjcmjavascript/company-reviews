import { ReportedCompanyPrimitive } from '@shared/entities/reported-company.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportedCompanyFindAllPaginatedRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where: Partial<ReportedCompanyPrimitive>) {
    const result = await this.prismaService.reportedCompany.findMany({
      where: {
        id: {
          gt: where.id,
        },
        deletedAt: null,
      },
      take: 20,
    });

    return result;
  }
}
