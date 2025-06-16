export interface ReviewDetailPrimitive {
  id: number;
  categoryId: number;
  description?: string;
  score: number;
}

export class ReviewDetail {
  private attributes: ReviewDetailPrimitive;

  constructor(readonly detail: ReviewDetailPrimitive) {
    this.attributes = detail;
  }

  static create(detail: Partial<ReviewDetailPrimitive>): ReviewDetail {
    return new ReviewDetail({
      id: detail.id,
      categoryId: detail.categoryId,
      description: detail.description,
      score: detail.score,
    });
  }

  toPrimitive(): ReviewDetailPrimitive {
    return this.attributes;
  }

  static fromArray(details: Array<ReviewDetailPrimitive>): Array<ReviewDetail> {
    return details.map((detail) => new ReviewDetail(detail));
  }

  static fromArrayToJsonResponse(
    details: Array<ReviewDetailPrimitive>,
  ): Array<ReviewDetailPrimitive> {
    return details.map((detail) => ({
      id: detail.id,
      categoryId: detail.categoryId,
      description: detail.description,
      score: detail.score,
    }));
  }

  get values() {
    return this.attributes;
  }
}
