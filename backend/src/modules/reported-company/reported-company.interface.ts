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
