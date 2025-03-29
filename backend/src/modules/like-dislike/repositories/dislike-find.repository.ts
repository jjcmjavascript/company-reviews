import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewDislikePrimitive } from '@shared/entities/review-dislike.entity';

@Injectable()
export class DislikeFindRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    params: Partial<ReviewDislikePrimitive>,
  ): Promise<ReviewDislikePrimitive | null> {
    return this.prismaService.reviewDislike.findFirst({
      where: {
        id: params.id,
        userId: params.userId,
        reviewId: params.reviewId,
      },
    });
  }
}
