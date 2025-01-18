import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReportedCompanyIndexServiceDto } from '../reported-company.interfaces';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';

@Injectable()
export class ReportedCompanyIndexService {
  constructor(private readonly rcQuery: ReportedCompanyIndexQuery) {}

  async execute(params: ReportedCompanyIndexServiceDto) {
    try {
      return this.rcQuery.execute({ from: params.from });
    } catch {
      throw new InternalServerErrorException(
        'An error happened when list was loading',
      );
    }
  }
}
