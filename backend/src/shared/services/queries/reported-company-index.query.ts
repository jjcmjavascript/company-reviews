import { Injectable } from '@nestjs/common';
import { ReportedCompanyIndexQueryResultItem } from '@shared/interfaces/reported-companies-index.interface';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class ReportedCompanyIndexQuery {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    from,
    limit = 20,
  }: {
    from: number;
    limit?: number;
  }): Promise<ReportedCompanyIndexQueryResultItem[]> {
    const categoriesCount = await this.prismaService.category.count();

    const paginatedCompanies = await this.prismaService.$queryRaw<
      ReportedCompanyIndexQueryResultItem[]
    >`
        SELECT "ReportedCompany".id as id, "ReportedCompany".name as name, ROUND(AVG(COALESCE("ReviewDetail".score, 0)), 2) as score , "Category".name as "type"
        from "ReportedCompany"
          JOIN "Review" ON "ReportedCompany".id = "Review"."reportedCompanyId"
          JOIN "ReviewDetail" ON "ReviewDetail"."reviewId" = "Review".id
          JOIN "Category" ON "ReviewDetail"."categoryId" = "Category".id
        WHERE "ReportedCompany".id > ${from} AND "ReportedCompany"."deletedAt" IS NULL
        GROUP BY "ReportedCompany".id, "ReviewDetail"."categoryId", "Category".name
        ORDER BY "ReportedCompany".id ASC
        LIMIT ${limit * categoriesCount}
    `;

    return paginatedCompanies;
  }
}
