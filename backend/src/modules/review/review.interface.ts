import { NumberIn } from '@shared/interfaces/prisma-query.interfaces';

export interface ReviewFindAll {
  id?: number | NumberIn;
  reportedCompanyId?: number;
}
