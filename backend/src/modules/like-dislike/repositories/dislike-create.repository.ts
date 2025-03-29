import { Injectable } from '@nestjs/common';
import { ReviewDislikePrimitive } from '@shared/entities/review-dislike.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class DislikeCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: {
    userId: number;
    reviewId: number;
  }): Promise<ReviewDislikePrimitive> {
    return this.prismaService.reviewDislike.create({
      data: {
        userId: params.userId,
        reviewId: params.reviewId,
      },
    });
  }
}
