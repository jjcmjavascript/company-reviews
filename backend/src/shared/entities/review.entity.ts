export interface ReviewPrimitive {
  id: number;
  userId: number;
  reportedCompanyId: number;
}

export class Review {
  private attributes: ReviewPrimitive;

  constructor(readonly review: ReviewPrimitive) {
    this.attributes = review;
  }

  static create(review: Partial<ReviewPrimitive>): Review {
    return new Review({
      id: review.id,
      userId: review.userId,
      reportedCompanyId: review.reportedCompanyId,
    });
  }

  toPrimitive(): ReviewPrimitive {
    return this.attributes;
  }

  static fromArray(reviews: Array<ReviewPrimitive>): Array<Review> {
    return reviews.map((review) => new Review(review));
  }

  get values() {
    return this.attributes;
  }
}
