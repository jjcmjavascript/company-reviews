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
      const scores = await this.reviewDetailtsFindTop.execute();
      const reviews = await this.reviewsRepository.execute({
        id: {
          in: scores.map((i) => i.reviewId),
        },
      });

      const companies = await this.companyRepository.execute({
        id: {
          in: reviews.map((r) => r.values.reportedCompanyId),
        },
      });

      return this.format({ scores, reviews, companies });
    } catch (e) {
      throw new InternalServerErrorException(
        'An error happend consulting the data',
      );
    }
  }

  private format(params: {
    companies: ReportedCompany[];
    reviews: Review[];
    scores: ReviewDetailsFindTopReturn[];
  }) {
    return params.reviews.map((r) => {
      const company = params.companies.find(
        (i) => r.values.reportedCompanyId === i.values.id,
      );

      return {
        id: company.values.id,
        name: company.values.name,
        score: params.scores.find((f) => f.reviewId === r.values.id).score,
      };
    });
  }
}
