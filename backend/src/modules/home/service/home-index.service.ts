import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReviewDetailsFindTopRepository } from '@modules/review-details/repositories/review-details-find-top.repository';
import { ReportedCompanyFindAllRepository } from '@modules/reported-company/repositories/reported-company-find-all.repository';
import { ReportedCompany } from '@shared/entities/reported-company.entity';
import { ReviewFindAllRepository } from '@modules/review/repositories/review-find-all.repository';
import { Review } from '@shared/entities/review.entity';
import { ReviewDetailsFindTopReturn } from '@modules/review-details/reviews-details.interfaces';

@Injectable()
export class HomeIndexService {
  constructor(
    private readonly reviewDetailtsFindTop: ReviewDetailsFindTopRepository,
    private readonly reviewsRepository: ReviewFindAllRepository,
    private readonly companyRepository: ReportedCompanyFindAllRepository,
  ) {}

  async execute() {
    try {
    } catch (e) {
      throw new InternalServerErrorException(
        'An error happend consulting the data',
      );
    }
  }
}
