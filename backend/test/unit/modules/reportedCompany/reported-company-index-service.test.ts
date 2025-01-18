import { ReportedCompanyIndexService } from '@modules/reported-company/service/reported-company-index.service';
import { Test } from '@nestjs/testing';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';

describe('ReportedCompanyIndexService', () => {
  let service: ReportedCompanyIndexService;
  let query: ReportedCompanyIndexQuery;

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: () => {},
          },
        },
        ReportedCompanyIndexQuery,
        ReportedCompanyIndexService,
      ],
    }).compile();

    query = ref.get(ReportedCompanyIndexQuery);
    service = ref.get(ReportedCompanyIndexService);
  });

  it('When NonNumber is sended should transform to 0', async () => {
    const querySpy = jest.spyOn(query, 'execute');

    const serviceSpy = jest.spyOn(service, 'execute');

    const params = { id: 1 };

    await service.execute(params);

    expect(serviceSpy).toHaveBeenCalledWith(params);

    expect(querySpy).toHaveBeenCalledTimes(1);

    expect(querySpy).toHaveBeenCalledWith({ from: params.id });
  });
});
