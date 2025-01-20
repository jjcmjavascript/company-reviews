import { Injectable } from '@nestjs/common';
import { ReportedCompanyIndexQueryResultItem } from '@shared/interfaces/reported-companies-index.interface';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class ReportedCompanyIndexQuery {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    from,
  }: {
    from: number;
  }): Promise<ReportedCompanyIndexQueryResultItem[]> {
    const paginatedCompanies = await this.prismaService.$queryRaw<
      ReportedCompanyIndexQueryResultItem[]
    >`
        SELECT "ReportedCompany".id as id, "ReportedCompany".name as name, ROUND(AVG("ReviewDetail".score), 2) as score , "SubType".name as "type"
        from "ReportedCompany"
          LEFT JOIN "Review" ON "ReportedCompany".id = "Review"."reportedCompanyId"
          LEFT JOIN "ReviewDetail" ON "ReviewDetail"."reviewId" = "Review".id
          LEFT JOIN "SubType" ON "ReviewDetail"."typeId" = "SubType".id
        WHERE "ReportedCompany".id > ${from} AND "ReportedCompany"."deletedAt" IS NULL
        GROUP BY "ReportedCompany".id, "ReviewDetail"."typeId", "SubType".name
        ORDER BY "ReportedCompany".id ASC
        LIMIT 20
    `;

    return paginatedCompanies;
  }
}
