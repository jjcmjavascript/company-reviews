export interface ReviewWhereIn {
  id?: {
    in?: number[];
  };
}

export interface ReviewWhere {
  id?: number;
}

export type ReviewCriteria = ReviewWhereIn | ReviewWhere;
