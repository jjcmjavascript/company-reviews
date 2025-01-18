import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';

@Injectable()
export class ReportedCompanyIndexService {
  constructor(private readonly rcQuery: ReportedCompanyIndexQuery) {}

  async execute(params: { id: number }) {
    try {
      return this.rcQuery.execute({ from: params.id || 0 });
    } catch {
      throw new InternalServerErrorException(
        'An error happened when list was loading',
      );
    }
  }
}
