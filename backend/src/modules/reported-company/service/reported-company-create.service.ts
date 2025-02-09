import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReportedCompanyCreateRepository } from '../repositories/reported-company-create.repository';
import {
  ReportedCompany,
  ReportedCompanyPrimitive,
} from '@shared/entities/reported-company.entity';

@Injectable()
export class ReportedCompanyCreateService {
  constructor(
    private readonly reportedCompanyCreateService: ReportedCompanyCreateRepository,
  ) {}

  async execute(
    params: Partial<ReportedCompanyPrimitive>,
  ): Promise<ReportedCompany> {
    try {
      const result = await this.reportedCompanyCreateService.execute(params);

      return ReportedCompany.create(result);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error on create reported company',
      );
    }
  }
}
