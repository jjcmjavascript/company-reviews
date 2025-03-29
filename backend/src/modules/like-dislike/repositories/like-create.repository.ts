import { Injectable } from '@nestjs/common';
import { ReviewLikePrimitive } from '@shared/entities/review-like.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class LikeCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: {
    userId: number;
    reviewId: number;
  }): Promise<ReviewLikePrimitive> {
    return this.prismaService.reviewLike.create({
      data: {
        userId: params.userId,
        reviewId: params.reviewId,
      },
    });
  }
}
