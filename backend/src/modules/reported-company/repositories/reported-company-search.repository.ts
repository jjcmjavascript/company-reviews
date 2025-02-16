import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReportedCompanySearchRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: {
    name: string;
  }): Promise<{ id: number; name: string }[]> {
    const companies = await this.prismaService.reportedCompany.findMany({
      where: {
        name: {
          contains: params.name,
        },
      },
    });

    return companies.map((company) => {
      return {
        id: company.id,
        name: company.name,
      };
    });
  }
}
