import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewLikePrimitive } from '@shared/entities/review-like.entity';

@Injectable()
export class LikeFindRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    params: Partial<ReviewLikePrimitive>,
  ): Promise<ReviewLikePrimitive | null> {
    return this.prismaService.reviewLike.findFirst({
      where: {
        id: params.id,
        userId: params.userId,
        reviewId: params.reviewId,
      },
    });
  }
}
