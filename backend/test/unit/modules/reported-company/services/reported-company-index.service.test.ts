import { ReportedCompanyPaginatedQueryService } from '@modules/reported-company/service/reported-company-index.service';
import { Test } from '@nestjs/testing';
import { ReportedCompanyPaginatedQuery } from '@shared/services/queries/reported-company-index.query';
import { getPrismaMock } from '../../../mocks/prisma.service.mock';
import { getReportedCompanyPaginatedQueryResultMocks } from '../../../mocks/entities/reported-company.mock';

describe('[Service] ReportedCompanyPaginatedQueryService', () => {
  let reportedCompanyIndexQuery: ReportedCompanyPaginatedQuery;
  let reportedCompanyIndexService: ReportedCompanyPaginatedQueryService;

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        getPrismaMock(),
        ReportedCompanyPaginatedQuery,
        ReportedCompanyPaginatedQueryService,
      ],
    }).compile();

    reportedCompanyIndexQuery = ref.get(ReportedCompanyPaginatedQuery);
    reportedCompanyIndexService = ref.get(ReportedCompanyPaginatedQueryService);
  });

  it('It should return an grouped array when has data', async () => {
    const queryMocks = getReportedCompanyPaginatedQueryResultMocks();
    const spyIndexQueryService = jest.spyOn(
      reportedCompanyIndexQuery,
      'execute',
    );

    spyIndexQueryService.mockResolvedValue(queryMocks);

    const result = await reportedCompanyIndexService.execute({ id: 1 });

    expect(result[1]).toHaveProperty('name');
    expect(result[1]).toHaveProperty('id');
    expect(result[1]).toHaveProperty('evaluation');
    expect(result[1].evaluation).toHaveLength(6);
  });
});
