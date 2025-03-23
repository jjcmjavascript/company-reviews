import {
  NumberIn,
  StartsWith,
  StringIn,
} from '@shared/interfaces/prisma-query.interfaces';

export interface ReportedCompanyWhere {
  id?: number | NumberIn;
  name?: string | StringIn | StartsWith;
}

export interface ReportedCompanyPaginatedResponse {
  currentId: number;
  nextId: number;
  pages: number;
  data: ReportedCompanyPaginate[];
}

export interface ReportedCompanyPaginate {
  name: string;
  id: number;
  evaluation: ReportedCompanyEvaluation[];
}
export interface ReportedCompanyEvaluation {
  type: string;
  score: number;
}
