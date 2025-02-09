import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReportedCompanyIndexQueryResultItem } from '@shared/interfaces/reported-companies-index.interface';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';

@Injectable()
export class ReportedCompanyIndexService {
  constructor(private readonly rcQuery: ReportedCompanyIndexQuery) {}

  async execute(params: { id: number }) {
    try {
      const queryResult = await this.rcQuery.execute({ from: params.id || 0 });

      const transformResult = this.transform(queryResult);

      return transformResult;
    } catch {
      throw new InternalServerErrorException(
        'An error happened when list was loading',
      );
    }
  }

  private transform(result: ReportedCompanyIndexQueryResultItem[]) {
    return result.reduce((acc, next) => {
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
  }
}
