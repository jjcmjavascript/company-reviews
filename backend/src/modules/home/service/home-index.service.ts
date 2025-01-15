import { ReportedCompany } from '@shared/entities/reported-company.entity';
import { HomeIndexResponse } from '../home.interfaces';

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
