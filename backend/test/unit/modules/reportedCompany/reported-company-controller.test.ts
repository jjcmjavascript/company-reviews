import { Test } from '@nestjs/testing';

import { ReportedCompanyController } from '@modules/reported-company/reported-company.controller';
import { ReportedCompanyIndexService } from '@modules/reported-company/service/reported-company-index.service';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReportedCompanyFindAllPaginatedRepository } from '@modules/reported-company/repositories/reported-company-find-all-paginated.repository';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';
import { ReportedCompanyIndexServiceDto } from '@modules/reported-company/reported-company.interfaces';
import { plainToClass } from 'class-transformer';

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

  it('ReportedCompanyController(Index) should transform string to number', async () => {
    const params = plainToClass(ReportedCompanyIndexServiceDto, {
      from: 'asd',
    });

    jest.spyOn(query, 'execute').mockImplementation(async () => []);

    const controllerSpy = jest.spyOn(controller, 'index');

    const serviceSpy = jest.spyOn(service, 'execute');

    const response = await controller.index(params);

    expect(controllerSpy).toHaveBeenCalledWith(params);

    expect(serviceSpy).toHaveBeenCalledWith({ id: 0 });

    expect(Array.isArray(response)).toBe(true);
  });

  it('ReportedCompanyController(Index) When a number is not provided should use 0', async () => {
    const params = plainToClass(ReportedCompanyIndexServiceDto, {});

    jest.spyOn(query, 'execute').mockImplementation(async () => []);

    const controllerSpy = jest.spyOn(controller, 'index');

    const serviceSpy = jest.spyOn(service, 'execute');

    const response = await controller.index(params);

    expect(controllerSpy).toHaveBeenCalledWith(params);

    expect(serviceSpy).toHaveBeenCalledWith({ id: 0 });

    expect(Array.isArray(response)).toBe(true);
  });
});
