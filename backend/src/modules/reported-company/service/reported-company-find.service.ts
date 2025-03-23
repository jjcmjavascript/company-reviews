import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ReportedCompanyFindOneByRepository } from '../repositories/reported-company-find-one-by.repository';
import { ReportedCompany } from '@shared/entities/reported-company.entity';

@Injectable()
export class ReportedCompanyFindService {
  private readonly logger = new Logger(ReportedCompanyFindService.name);

  constructor(
    private readonly repository: ReportedCompanyFindOneByRepository,
  ) {}

  async execute({ id }: { id: number }): Promise<ReportedCompany> {
    try {
      const reportedCompany = await this.repository.execute({
        id,
      });

      if (!reportedCompany) {
        this.logger.error(
          `[ReportedCompanyFindService] Reported company with ID ${id} not found.`,
        );
        throw new NotFoundException('Reported company not found.');
      }

      return ReportedCompany.create(reportedCompany);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(`[ReportedCompanyFindService] ${error.message}`);

      throw new InternalServerErrorException(
        'An error occurred while trying to find the reported company.',
      );
    }
  }
}
