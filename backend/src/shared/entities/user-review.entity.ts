export interface UserReviewPrimitive {
  id: number;
  userId: number;
  reportedCompanyId: number;
}

export class UserReview {
  private attributes: UserReviewPrimitive;

  constructor(readonly review: UserReviewPrimitive) {
    this.attributes = review;
  }

  static create(review: Partial<UserReviewPrimitive>): UserReview {
    return new UserReview({
      id: review.id,
      userId: review.userId,
      reportedCompanyId: review.reportedCompanyId,
    });
  }

  toPrimitive(): UserReviewPrimitive {
    return this.attributes;
  }

  static fromArray(reviews: Array<UserReviewPrimitive>): Array<UserReview> {
    return reviews.map((review) => new UserReview(review));
  }

  get values() {
    return this.attributes;
  }
}
