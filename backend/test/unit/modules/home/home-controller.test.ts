import { Test } from '@nestjs/testing';

import { ReportedCompanyFindAllRepository } from '@modules/reported-company/repositories/reported-company-find-all.repository';
import { HomeController } from '@modules/home/home.controller';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { HomeIndexService } from '@modules/home/service/home-index.service';
import { ReportedCompany } from '@shared/entities/reported-company.entity';

describe('HomeController', () => {
  let homeController: HomeController;
  let reportedCompanyFindAllRepository: ReportedCompanyFindAllRepository;

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        ReportedCompanyFindAllRepository,
        HomeIndexService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
      controllers: [HomeController],
    }).compile();

    homeController = ref.get(HomeController);
    reportedCompanyFindAllRepository = ref.get(
      ReportedCompanyFindAllRepository,
    );
  });

  it('should return a list of companies', async () => {
    const result = [];
    jest
      .spyOn(reportedCompanyFindAllRepository, 'execute')
      .mockImplementationOnce(async () => result);

    const response = await homeController.index();

    expect(Array.isArray(response)).toBe(true);
    expect(response).toHaveLength(0);
  });

  it('should return at leat 1 result', async () => {
    const companies = [new ReportedCompany({ id: 1, name: 'Test Company' })];

    jest
      .spyOn(reportedCompanyFindAllRepository, 'execute')
      .mockImplementationOnce(async () => companies);

    const response = await homeController.index();

    expect(response.length).toBeGreaterThan(0);
    expect(response.some((i) => i.name.includes('Test'))).toBeTruthy();
  });
});
