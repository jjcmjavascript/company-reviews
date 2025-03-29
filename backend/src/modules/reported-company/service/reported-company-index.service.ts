import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  ReportedCompanyPaginatedQuery,
  ReportedCompanyPaginatedQueryParams,
  ReportedCompanyPaginatedQueryResult,
} from '@shared/services/queries/reported-company-index.query';

@Injectable()
export class ReportedCompanyPaginatedQueryService {
  private logger = new Logger(ReportedCompanyPaginatedQueryService.name);

  constructor(private readonly rcQuery: ReportedCompanyPaginatedQuery) {}

  async execute(
    params: Partial<ReportedCompanyPaginatedQueryParams>,
  ): Promise<ReportedCompanyPaginatedQueryResult> {
    try {
      const queryResult = await this.rcQuery.execute({
        ...params,
        page: params.page || 1,
        limit: params.limit || 20,
      });

      return queryResult;
    } catch (e: unknown) {
      this.logger.error(
        `An error happened when list was loading: ${(e as Error).message}`,
      );

      throw new InternalServerErrorException(
        'An error happened when list was loading',
      );
    }
  }
}
