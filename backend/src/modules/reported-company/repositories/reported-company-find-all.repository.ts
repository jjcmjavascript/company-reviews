import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ReportedCompany } from '@shared/entities/reported-company.entity';

@Injectable()
export class ReportedCompanyFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<ReportedCompany[]> {
    const result = await this.prismaService.reportedCompany.findMany({
      orderBy: { id: 'desc' },
      take: 5,
      where: {
        deletedAt: null,
      },
    });

    return ReportedCompany.fromArray(result);
  }
}
