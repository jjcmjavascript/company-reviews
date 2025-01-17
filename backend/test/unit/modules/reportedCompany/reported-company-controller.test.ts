import { Test } from '@nestjs/testing';

import { ReportedCompanyController } from '@modules/reported-company/reported-company.controller';
import { ReportedCompanyIndexService } from '@modules/reported-company/service/reported-company-index.service';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

describe('ReportedCompanyController', () => {
  let controller: ReportedCompanyController;

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {},
        },
        ReportedCompanyIndexService,
      ],
      controllers: [ReportedCompanyController],
    }).compile();

    controller = ref.get(ReportedCompanyController);
  });

  it('ReportedCompanyController(Index) should return a list of companies', async () => {
    const response = await controller.index({
      id: 1,
    });

    expect(Array.isArray(response)).toBe(true);
  });
});
