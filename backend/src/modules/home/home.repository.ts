import { ReviewFindAll } from '@modules/review/repositories/review-find-all.repository';
import { UserReviewDetailsFindTopRepository } from '@modules/user-review-details/repositories/user-review-details-find-top.repository';
import { UserReviewDetailsFindTopReturn } from '@modules/user-review-details/user-reviews-details.interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeRepository {
  constructor(
    private readonly reviewDetailtsFindTop: UserReviewDetailsFindTopRepository,
    private readonly reviewRepository: ReviewFindAll,
  ) {}

  async execute(): Promise<UserReviewDetailsFindTopReturn[]> {
    // const reportedCompanies =
    //   await this.reportedCompanyFindAllRepository.execute();

    // const indexService = this.indexService.execute(reportedCompanies);
    return [];
  }
}
