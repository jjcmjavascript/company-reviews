import { Test } from '@nestjs/testing';

import { ReportedCompanyFindAllRepository } from '@modules/reported-company/repositories/reported-company-find-all.repository';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { HomeIndexService } from '@modules/home/service/home-index.service';
import { ReportedCompany } from '@shared/entities/reported-company.entity';
import { UserReviewDetailsFindTopRepository } from '@modules/user-review-details/repositories/user-review-details-find-top.repository';
import { ReviewFindAllRepository } from '@modules/review/repositories/review-find-all.repository';
import { Review } from '@shared/entities/review.entity';

describe('/HomeService', () => {
  let homeService: HomeIndexService;
  let reportedCompanyFindAllRepository: ReportedCompanyFindAllRepository;
  let userReviewDetailsFindTopRepository: UserReviewDetailsFindTopRepository;
  let reviewFindAllRepository: ReviewFindAllRepository;

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {},
        },
        UserReviewDetailsFindTopRepository,
        ReviewFindAllRepository,
        ReportedCompanyFindAllRepository,
        HomeIndexService,
      ],
    }).compile();

    homeService = ref.get(HomeIndexService);

    userReviewDetailsFindTopRepository = ref.get(
      UserReviewDetailsFindTopRepository,
    );

    reviewFindAllRepository = ref.get(ReviewFindAllRepository);

    reportedCompanyFindAllRepository = ref.get(
      ReportedCompanyFindAllRepository,
    );
  });

  it('should return a list of companies', async () => {
    const result = [];

    jest
      .spyOn(userReviewDetailsFindTopRepository, 'execute')
      .mockImplementationOnce(async () => result);

    jest
      .spyOn(reviewFindAllRepository, 'execute')
      .mockImplementationOnce(async () => result);

    jest
      .spyOn(reportedCompanyFindAllRepository, 'execute')
      .mockImplementationOnce(async () => result);

    const homeServiceResult = await homeService.execute();

    expect(Array.isArray(homeServiceResult)).toBe(true);
    expect(homeServiceResult).toHaveLength(0);
  });

  it('should return at leat 1 result', async () => {
    jest
      .spyOn(userReviewDetailsFindTopRepository, 'execute')
      .mockImplementationOnce(async () => [
        { score: 2, reviewId: 2 },
        { score: 2, reviewId: 3 },
      ]);

    jest
      .spyOn(reviewFindAllRepository, 'execute')
      .mockImplementationOnce(async () => [
        new Review({ id: 2, userId: 2, reportedCompanyId: 2 }),
        new Review({ id: 3, userId: 3, reportedCompanyId: 3 }),
      ]);

    jest
      .spyOn(reportedCompanyFindAllRepository, 'execute')
      .mockImplementationOnce(async () => [
        new ReportedCompany({ id: 2, name: 'zurdos inutiles' }),
        new ReportedCompany({ id: 3, name: 'derechos inutiles' }),
      ]);

    const homeServiceResult = await homeService.execute();

    expect(homeServiceResult.length).toBeGreaterThan(0);
    expect(homeServiceResult).toHaveLength(2);
    expect(
      homeServiceResult.some((i) => i.name.includes('zurdos')),
    ).toBeTruthy();
  });
});
