import { Injectable } from '@nestjs/common';
import { ReportedCompanyPrimitive } from '@shared/entities/reported-company.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReportedCompanyCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(createParams: Partial<ReportedCompanyPrimitive>) {
    this.prismaService.$transaction(async (ctx) => {
      ctx.reportedCompany.create({
        data: {
          name: createParams.name,
          description: createParams.description,
          image: createParams.image,
        },
      });
    });
  }
}
