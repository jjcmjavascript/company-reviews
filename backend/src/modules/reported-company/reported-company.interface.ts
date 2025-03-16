export interface ReportedCompanyWhereIn {
  id?: {
    in?: number[];
  };
}

export interface ReportedCompanyWhere {
  id?: number;
}

export type ReportedCompanyCriteria =
  | ReportedCompanyWhereIn
  | ReportedCompanyWhere;

export interface ReportedCompanyIndexResponse {
  [companyId: number]: {
    name: string;
    id: number;
    evaluation: CompanyEvaluation[];
  };
}

interface CompanyEvaluation {
  type: string;
  score: number;
}
