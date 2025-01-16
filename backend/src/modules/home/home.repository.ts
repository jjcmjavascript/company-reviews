import { ReportedCompanyFindAllRepository } from '@modules/reported-company/repositories/reported-company-find-all.repository';
import { UserReviewDetailsFindTopRepository } from '@modules/user-review-details/repositories/user-review-details-find-top.repository';
import { UserReviewDetailsFindTopReturn } from '@modules/user-review-details/user-reviews-details.interfaces';
import { Injectable } from '@nestjs/common';
import { ReportedCompany } from '@shared/entities/reported-company.entity';

@Injectable()
export class HomeRepository {
  constructor(
    private readonly reviewDetailtsFindTop: UserReviewDetailsFindTopRepository,
    private readonly companyRepository: ReportedCompanyFindAllRepository,
  ) {}

  async execute(): Promise<{
    reviews: ReportedCompany[];
    scores: UserReviewDetailsFindTopReturn[];
  }> {
    const scores = await this.reviewDetailtsFindTop.execute();
    const reviews = await this.companyRepository.execute({
      id: {
        in: scores.map((i) => i.reviewId),
      },
    });

    return { reviews, scores };
  }
}
