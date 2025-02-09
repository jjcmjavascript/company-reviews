import { ReportedCompanyIndexService } from '@modules/reported-company/service/reported-company-index.service';
import { Test } from '@nestjs/testing';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';

describe('[Service] ReportedCompanyIndexService', () => {
  let reportedCompanyIndexQuery: ReportedCompanyIndexQuery;
  let reportedCompanyIndexService: ReportedCompanyIndexService;

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useFactory: () => {
            return {
              $queryRaw: () => {},
            };
          },
        },
        ReportedCompanyIndexQuery,
        ReportedCompanyIndexService,
      ],
    }).compile();

    reportedCompanyIndexQuery = ref.get(ReportedCompanyIndexQuery);
    reportedCompanyIndexService = ref.get(ReportedCompanyIndexService);
  });

  it('It should return an grouped array when has data', async () => {
    const values = [
      {
        name: 'Company 1',
        id: 1,
        type: 'Type 1',
        score: 1,
      },
      {
        name: 'Company 2',
        id: 2,
        type: 'Type 2',
        score: 2,
      },
      {
        name: 'Company 2',
        id: 2,
        type: 'Type 3',
        score: 3,
      },
    ];
    const spyIndexQueryService = jest.spyOn(
      reportedCompanyIndexQuery,
      'execute',
    );

    spyIndexQueryService.mockResolvedValue(values);

    const result = await reportedCompanyIndexService.execute({ id: 1 });

    expect(result).toEqual({
      1: {
        name: 'Company 1',
        id: 1,
        evaluation: [{ type: 'Type 1', score: 1 }],
      },
      2: {
        name: 'Company 2',
        id: 2,
        evaluation: [
          {
            type: 'Type 2',
            score: 2,
          },
          {
            type: 'Type 3',
            score: 3,
          },
        ],
      },
    });
  });

  it('It should return an empty object when has no data', async () => {
    const values = [];
    const spyIndexQueryService = jest.spyOn(
      reportedCompanyIndexQuery,
      'execute',
    );

    spyIndexQueryService.mockResolvedValue(values);

    const result = await reportedCompanyIndexService.execute({ id: 1 });

    expect(result).toEqual({});
  });
});
