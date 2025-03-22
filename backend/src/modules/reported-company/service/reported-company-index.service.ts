import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReportedCompanyIndexQueryResultItem } from '@shared/interfaces/reported-companies-index.interface';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';
import { isPositiveNumber } from '@shared/helpers/number.helper';
import { ReportedCompanyIndexResponse } from '../reported-company.interface';
import { isEmpty } from 'class-validator';

@Injectable()
export class ReportedCompanyIndexService {
  private logger = new Logger(ReportedCompanyIndexService.name);

  constructor(private readonly rcQuery: ReportedCompanyIndexQuery) {}

  async execute(params: {
    id: unknown;
  }): Promise<ReportedCompanyIndexResponse> {
    const idToNumber = Number(params.id);

    if (!isEmpty(params.id) && !isPositiveNumber(idToNumber)) {
      this.logger.error('Invalid id', idToNumber);
      throw new BadRequestException('Invalid id');
    }

    try {
      const queryResult = await this.rcQuery.execute({ from: idToNumber });

      const transformResult = this.transform(queryResult);

      return transformResult;
    } catch (e: unknown) {
      this.logger.error(
        `An error happened when list was loading ${(e as Error).message}`,
      );

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
