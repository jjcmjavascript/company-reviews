import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class ReportedCompanyPaginatedQuery {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    page = 1,
    limit = 20,
    orderBy = 'id',
    order = 'ASC',
    name,
  }: ReportedCompanyPaginatedQueryParams): Promise<ReportedCompanyPaginatedQueryResult> {
    const totalCompanies = await this.prismaService.reportedCompany.count({
      where: {
        deletedAt: null,
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
    });

    const offset = (page - 1) * limit;

    const orderByExpression = this.getOrderBySqlExpression(orderBy, order);

    const paginatedCompanies = await this.prismaService.$queryRawUnsafe<
      ReportedCompanyPaginatedQueryResultItem[]
    >(`
      SELECT
        "ReportedCompany".id AS id,
        "ReportedCompany".name AS name,
        ROUND(AVG(COALESCE("ReviewDetail".score, 0)), 2) AS score
      FROM "ReportedCompany"
        JOIN "Review"
          ON "ReportedCompany".id = "Review"."reportedCompanyId"
        JOIN "ReviewDetail"
          ON "ReviewDetail"."reviewId" = "Review".id
      WHERE "ReportedCompany"."deletedAt" IS NULL ${name ? `AND "ReportedCompany".name ILIKE '%${name}%'` : ''}
      GROUP BY "ReportedCompany".id
      ORDER BY ${orderByExpression}
      LIMIT ${limit} OFFSET ${offset}
    `);

    const totalPages = Math.ceil(totalCompanies / limit);

    return {
      page,
      nextPage: page + 1 <= totalPages ? page + 1 : null,
      prevPage: page - 1 > 0 ? page - 1 : null,
      totalPages,
      data: paginatedCompanies,
    };
  }

  private getOrderBySqlExpression(orderBy: string, order: string): string {
    if (orderBy === 'score') {
      return `ROUND(AVG(COALESCE("ReviewDetail".score, 0)), 2) ${order}, "ReportedCompany".id ${order}`;
    } else if (orderBy === 'name') {
      return `UPPER("ReportedCompany".name) ${order}, "ReportedCompany".id ${order}`;
    }
    return `"ReportedCompany".${orderBy} ${order}`;
  }
}

export interface ReportedCompanyPaginatedQueryResult {
  page: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
  data: ReportedCompanyPaginatedQueryResultItem[];
}

export interface ReportedCompanyPaginatedQueryResultItem {
  id: number;
  name: string;
  score: number;
}

export interface ReportedCompanyPaginatedQueryParams {
  page?: number; // Página a mostrar (empieza en 1)
  limit?: number; // Cuántos registros por página
  orderBy?: 'id' | 'name' | 'score';
  order?: 'ASC' | 'DESC';
  name?: string; // Nombre de la empresa a buscar
}
