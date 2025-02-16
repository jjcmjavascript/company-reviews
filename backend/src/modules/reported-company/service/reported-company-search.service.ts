import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReportedCompanySearchRepository } from '../repositories/reported-company-search.repository';

@Injectable()
export class ReportedCompanySearchService {
  constructor(
    private readonly reportedCompanySearchRepository: ReportedCompanySearchRepository,
  ) {}

  async execute(params: {
    name: string;
  }): Promise<{ id: number; name: string }[]> {
    try {
      const searchResult =
        await this.reportedCompanySearchRepository.execute(params);

      const result = searchResult.map((company) => {
        return {
          id: company.id,
          name: company.name,
        };
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while trying to search for the reported company.',
      );
    }
  }
}
