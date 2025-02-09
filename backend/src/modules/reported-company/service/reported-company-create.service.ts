import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReportedCompanyCreateDto } from '../reported-company.dto';
import { ReportedCompanyCreateRepository } from '../repositories/reported-company-create.repository';
import { ReportedCompany } from '@shared/entities/reported-company.entity';

@Injectable()
export class ReportedCompanyCreateService {
  constructor(
    private readonly reportedCompanyCreateService: ReportedCompanyCreateRepository,
  ) {}

  async execute(params: ReportedCompanyCreateDto): Promise<ReportedCompany> {
    try {
      const result = await this.reportedCompanyCreateService.execute(params);

      return ReportedCompany.create(result);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error on create reported company',
      );
    }
  }
}
