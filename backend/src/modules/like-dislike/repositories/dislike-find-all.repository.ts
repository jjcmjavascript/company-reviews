// dislike-find-all.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewDislikePrimitive } from '@shared/entities/review-dislike.entity';

@Injectable()
export class DislikeFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: {
    reviewId: number;
  }): Promise<ReviewDislikePrimitive[]> {
    return this.prismaService.reviewDislike.findMany({
      where: { reviewId: params.reviewId },
    });
  }
}
