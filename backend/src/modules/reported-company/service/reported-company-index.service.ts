import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReportedCompanyPaginatedQueryResultItem } from '@shared/interfaces/reported-companies-index.interface';
import { ReportedCompanyPaginatedQuery } from '@shared/services/queries/reported-company-index.query';
import { isPositiveNumber } from '@shared/helpers/number.helper';
import {
  ReportedCompanyPaginate,
  ReportedCompanyPaginatedResponse,
} from '../reported-company.interface';
import { isEmpty } from 'class-validator';

@Injectable()
export class ReportedCompanyPaginatedQueryService {
  private logger = new Logger(ReportedCompanyPaginatedQueryService.name);

  constructor(private readonly rcQuery: ReportedCompanyPaginatedQuery) {}

  async execute(params: {
    id: unknown;
  }): Promise<ReportedCompanyPaginatedResponse> {
    const idToNumber = Number(params.id);

    if (!isEmpty(params.id) && !isPositiveNumber(idToNumber)) {
      this.logger.error('Invalid id', idToNumber);
      throw new BadRequestException('Invalid id');
    }

    try {
      const queryResult = await this.rcQuery.execute({ from: idToNumber });

      return {
        currentId: queryResult.currentId,
        nextId: queryResult.nextId,
        pages: queryResult.pages,
        data: this.transform(queryResult.data),
      };
    } catch (e: unknown) {
      this.logger.error(
        `An error happened when list was loading ${(e as Error).message}`,
      );

      throw new InternalServerErrorException(
        'An error happened when list was loading',
      );
    }
  }

  private transform(result: ReportedCompanyPaginatedQueryResultItem[]) {
    const grouped = result.reduce((acc, next) => {
      if (!acc[next.id]) {
        acc[next.id] = {
          name: next.name,
          id: next.id,
          evaluation: [{ type: next.type, score: next.score }],
        };

        return acc;
      }

      acc[next.id].evaluation.push({ type: next.type, score: next.score });

      return acc;
    }, {});

    return Object.values(grouped) as ReportedCompanyPaginate[];
  }
}
