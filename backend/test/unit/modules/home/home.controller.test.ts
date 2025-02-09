import { Test } from '@nestjs/testing';

import { ReportedCompanyFindAllRepository } from '@modules/reported-company/repositories/reported-company-find-all.repository';
import { HomeController } from '@modules/home/home.controller';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { HomeIndexService } from '@modules/home/service/home-index.service';
import { ReportedCompany } from '@shared/entities/reported-company.entity';
import { ReviewDetailsFindTopRepository } from '@modules/review-details/repositories/review-details-find-top.repository';
import { ReviewFindAllRepository } from '@modules/review/repositories/review-find-all.repository';
import { Review } from '@shared/entities/review.entity';

describe('HomeController', () => {
  let homeController: HomeController;
  let reportedCompanyFindAllRepository: ReportedCompanyFindAllRepository;
  let userReviewDetailsFindTopRepository: ReviewDetailsFindTopRepository;
  let reviewFindAllRepository: ReviewFindAllRepository;

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {},
        },
        ReviewDetailsFindTopRepository,
        ReviewFindAllRepository,
        ReportedCompanyFindAllRepository,
        HomeIndexService,
      ],
      controllers: [HomeController],
    }).compile();

    homeController = ref.get(HomeController);

    userReviewDetailsFindTopRepository = ref.get(
      ReviewDetailsFindTopRepository,
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

    const response = await homeController.index();

    expect(Array.isArray(response)).toBe(true);
    expect(response).toHaveLength(0);
  });

  it('should return at leat 1 result', async () => {
    jest
      .spyOn(userReviewDetailsFindTopRepository, 'execute')
      .mockImplementationOnce(async () => [{ score: 2, reviewId: 2 }]);

    jest
      .spyOn(reviewFindAllRepository, 'execute')
      .mockImplementationOnce(async () => [
        new Review({ id: 2, userId: 2, reportedCompanyId: 2 }),
      ]);

    jest
      .spyOn(reportedCompanyFindAllRepository, 'execute')
      .mockImplementationOnce(async () => [
        new ReportedCompany({ id: 2, name: 'zurdos inutiles' }),
      ]);

    const response = await homeController.index();

    expect(response.length).toBeGreaterThan(0);
    expect(response.some((i) => i.name.includes('zurdos'))).toBeTruthy();
  });
});
