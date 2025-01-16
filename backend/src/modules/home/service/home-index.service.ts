import { ReportedCompany } from '@shared/entities/reported-company.entity';
import { HomeIndexResponse } from '../home.interfaces';
import { Review } from '@shared/entities/review.entity';

export class HomeIndexService {
  constructor() {}

  async execute(list: ReportedCompany[]): Promise<HomeIndexResponse[]> {
    return list.map((l) => ({
      id: l.values.id,
      name: l.values.name,
      score: 2,
    }));
  }
}
