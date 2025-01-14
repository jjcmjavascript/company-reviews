export interface ReviewDetailPrimitive {
  id: number;
  typeId: number;
  description?: string;
  reportedCompanyId: number;
  score: number;
  userReviewId: number;
}

export class ReviewDetail {
  private attributes: ReviewDetailPrimitive;

  constructor(readonly detail: ReviewDetailPrimitive) {
    this.attributes = detail;
  }

  static create(detail: Partial<ReviewDetailPrimitive>): ReviewDetail {
    return new ReviewDetail({
      id: detail.id,
      typeId: detail.typeId,
      description: detail.description,
      reportedCompanyId: detail.reportedCompanyId,
      score: detail.score,
      userReviewId: detail.userReviewId,
    });
  }

  toPrimitive(): ReviewDetailPrimitive {
    return this.attributes;
  }

  static fromArray(details: Array<ReviewDetailPrimitive>): Array<ReviewDetail> {
    return details.map((detail) => new ReviewDetail(detail));
  }

  get values() {
    return this.attributes;
  }
}
