export interface ReviewLikePrimitive {
  id: number;
  userId: number;
  reviewId: number;
  createdAt: Date;
  deletedAt?: Date;
}

export class ReviewLike {
  private attributes: ReviewLikePrimitive;

  constructor(readonly like: ReviewLikePrimitive) {
    this.attributes = like;
  }

  static create(data: Partial<ReviewLikePrimitive>): ReviewLike {
    return new ReviewLike({
      id: data.id!,
      userId: data.userId!,
      reviewId: data.reviewId!,
      createdAt: data.createdAt ?? new Date(),
      deletedAt: data.deletedAt,
    });
  }

  toPrimitive(): ReviewLikePrimitive {
    return this.attributes;
  }

  static fromArray(list: ReviewLikePrimitive[]): ReviewLike[] {
    return list.map((item) => new ReviewLike(item));
  }

  get values() {
    return this.attributes;
  }
}
