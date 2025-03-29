// like-find-all.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewLikePrimitive } from '@shared/entities/review-like.entity';

@Injectable()
export class LikeFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: { reviewId: number }): Promise<ReviewLikePrimitive[]> {
    return this.prismaService.reviewLike.findMany({
      where: { reviewId: params.reviewId },
    });
  }
}
