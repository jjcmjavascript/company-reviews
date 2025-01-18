import { Test } from '@nestjs/testing';

import { ReportedCompanyController } from '@modules/reported-company/reported-company.controller';
import { ReportedCompanyIndexService } from '@modules/reported-company/service/reported-company-index.service';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReportedCompanyFindAllPaginatedRepository } from '@modules/reported-company/repositories/reported-company-find-all-paginated.repository';
import { ReportedCompanyIndexQuery } from '@shared/services/querys/reported-company-index.query';

describe('ReportedCompanyController', () => {
  let controller: ReportedCompanyController;
  let service: ReportedCompanyIndexService;
  let query: ReportedCompanyIndexQuery;

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        ReportedCompanyIndexQuery,
        {
          provide: ReportedCompanyFindAllPaginatedRepository,
          useValue: {},
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        ReportedCompanyIndexService,
      ],
      controllers: [ReportedCompanyController],
    }).compile();

    controller = ref.get(ReportedCompanyController);
    service = ref.get(ReportedCompanyIndexService);
    query = ref.get(ReportedCompanyIndexQuery);
  });

  it('ReportedCompanyController(Index)', async () => {
    const params = {
      from: 1,
    };

    jest.spyOn(query, 'execute').mockImplementation(async () => []);

    const controllerSpy = jest.spyOn(controller, 'index');
    const serviceSpy = jest.spyOn(service, 'execute');
    const response = await controller.index(params);

    expect(controllerSpy).toHaveBeenCalledWith(params);
    expect(Array.isArray(response)).toBe(true);
    expect(serviceSpy).toHaveBeenCalledWith(params);
  });
});
