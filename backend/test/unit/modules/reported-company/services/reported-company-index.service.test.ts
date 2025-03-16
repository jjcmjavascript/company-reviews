import { ReportedCompanyIndexService } from '@modules/reported-company/service/reported-company-index.service';
import { Test } from '@nestjs/testing';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';
import { getPrismaMock } from '../../../mocks/prisma.service.mock';
import { getReportedCompanyIndexQueryResultMocks } from '../../../mocks/entities/reported-company.mock';

describe('[Service] ReportedCompanyIndexService', () => {
  let reportedCompanyIndexQuery: ReportedCompanyIndexQuery;
  let reportedCompanyIndexService: ReportedCompanyIndexService;

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        getPrismaMock(),
        ReportedCompanyIndexQuery,
        ReportedCompanyIndexService,
      ],
    }).compile();

    reportedCompanyIndexQuery = ref.get(ReportedCompanyIndexQuery);
    reportedCompanyIndexService = ref.get(ReportedCompanyIndexService);
  });

  it('It should return an grouped array when has data', async () => {
    const queryMocks = getReportedCompanyIndexQueryResultMocks();
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
