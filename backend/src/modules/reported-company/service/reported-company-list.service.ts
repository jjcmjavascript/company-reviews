import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReportedCompanyPaginatedQueryResult } from '@shared/services/queries/reported-company-index.query';
import { ReportedCompanyFindAllPaginatedRepository } from '../repositories/reported-company-find-all-paginated.repository';
import { ReportedCompanyListServiceDto } from '../reported-company.dto';

@Injectable()
export class ReportedCompanyListService {
  private logger = new Logger(ReportedCompanyListService.name);

  constructor(
    private readonly repository: ReportedCompanyFindAllPaginatedRepository,
  ) {}

  async execute(
    params: ReportedCompanyListServiceDto,
  ): Promise<ReportedCompanyPaginatedQueryResult> {
    try {
      const { limit = 6 } = params;

      const queryResult = await this.repository.execute({
        skip: 0,
        take: limit,
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
