import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class LikeDestroyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: {
    id?: number;
    userId: number;
    reviewId: number;
  }): Promise<void> {
    await this.prismaService.reviewLike.deleteMany({
      where: {
        id: params.id,
        userId: params.userId,
        reviewId: params.reviewId,
      },
    });
  }
}
